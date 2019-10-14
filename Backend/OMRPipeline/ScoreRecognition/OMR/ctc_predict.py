import tensorflow as tf
import cv2
import numpy as np

from imageio import imread
import base64
import io
import os
import time

import matplotlib.pyplot as plt

class Predictor:

    model = "OMR/Config/agnostic_model_homophonic"
    model_meta = "OMR/Config/agnostic_model_homophonic.meta"
    dictionary_path = "OMR/vocab/dev-test_vocabulary.npy"
    frozen_model = "OMR/Config/readscoModel.pb"

    def __init__(self):
        print('Initializing predictor...\t')
        #Init TensorFlow
        #tf.reset_default_graph()
        #self.session = tf.InteractiveSession()

        with tf.gfile.GFile(self.frozen_model, "rb") as file:
            restored_graph_def = tf.GraphDef()
            restored_graph_def.ParseFromString(file.read())
        
        with tf.Graph().as_default() as graph:
            tf.import_graph_def(
                restored_graph_def,
                input_map= None,
                return_elements= None,
                name= ""
            )
        
        self.session = tf.Session(graph= graph)
        
        #Init dictionary
    
        word2int = np.array(np.load(self.dictionary_path, allow_pickle=True))
        self.int2word = {y: x for x, y in word2int[()].items()}
        
        #Load the model 
        #self.saver = tf.train.import_meta_graph(self.model_meta)
        #self.saver.restore(self.session, self.model)

        #graph = tf.get_default_graph()

        #TensorFlow configurations
        prefix = ""
        #prefix = "all/"
        self.input = graph.get_tensor_by_name(prefix + "model_input:0")
        self.seq_len = graph.get_tensor_by_name(prefix + "seq_lengths:0")
        self.rnn_keep_prob = graph.get_tensor_by_name(prefix + "keep_prob:0")
        height_tensor = graph.get_tensor_by_name(prefix + "input_height:0")
        width_reduction_tensor = graph.get_tensor_by_name(prefix + "width_reduction:0")
        self.logits = graph.get_tensor_by_name("logits/BiasAdd:0")

        # Constants that are saved inside the model itself
        self.WIDTH_REDUCTION, self.HEIGHT = self.session.run([width_reduction_tensor, height_tensor])
        #self.decoded, _ = tf.nn.ctc_greedy_decoder(logits, self.seq_len)
        self.decoded , self.prob = tf.nn.ctc_beam_search_decoder(
                self.logits,
                self.seq_len,
                beam_width= 50,
                top_paths= 5,
                merge_repeated= True
        )

        print('Initialized!\t')

    def make_prediction(self,imageToPredict):
        
        image = imageToPredict
        #We resize the image to the height TensorFlow is using
        image = self.__resize(image, self.HEIGHT)
        #We normalize the image
        #image = self.__normalize(image)
        
        notNormalizedImage = 255. * image
        cv2.imwrite("test.png", notNormalizedImage)

        image = np.asarray(image).reshape(1, image.shape[0], image.shape[1], 1)
        seq_lengths = [image.shape[2] / self.WIDTH_REDUCTION]
        prediction, probabilities = self.session.run([self.decoded, self.prob], 
                                      feed_dict={
                                          self.input: image,
                                          self.seq_len: seq_lengths,
                                          self.rnn_keep_prob: 1.0,
                                      })
        
        str_predictions = self.__sparse_tensor_to_strs(prediction)
        
        #print()
        result = ""
        for w in str_predictions[0]:
            result += self.int2word[w] + " "
        return result
    
    def benchmark_beamdecoder(self, imageToPredict):
        #We decode the base64 string we have sent through the socket
        image = self.__decodebase64Img(imageToPredict)
        #We resize the image to the height TensorFlow is using
        image = self.__resize(image, self.HEIGHT)
        #We normalize the image
        image = self.__normalize(image)
        image = np.asarray(image).reshape(1, image.shape[0], image.shape[1], 1)
        seq_lengths = [image.shape[2] / self.WIDTH_REDUCTION]

        top_paths = []
        benchmark_results = []
        beam_w = 100

        print('Performing benchmarks\n')
        for i in range(1, 11):
            top_p = i * 10 
            if top_p > beam_w:
                beam_w += 100
            top_paths.append(top_p)
            prediction_tensor, _ = tf.nn.ctc_beam_search_decoder(
                self.logits,
                self.seq_len,
                beam_width= beam_w,
                top_paths= top_p,
                merge_repeated= True
            )

            start = time.time()
            _ = self.session.run(prediction_tensor, 
                                feed_dict={
                                    self.input: image,
                                    self.seq_len: seq_lengths,
                                    self.rnn_keep_prob: 1.0,
                            })
            end = time.time()
            benchmark = end - start
            benchmark_results.append(benchmark)
            if benchmark > 35.0:
                print('Exceeded limit of users patience')
                break
        
        print('Benchmarking finished \n')

        plt.plot(top_paths, benchmark_results)
        plt.ylabel('Time (s)')
        plt.xlabel('Top paths')
        plt.savefig('results.png')

        return ""
    
    
    def __convert_inputs_to_ctc_format(self, target_text):
        SPACE_TOKEN = '-'
        SPACE_INDEX = 4
        FIRST_INDEX = 0

        original = ' '.join(target_text.strip().lower().split(' ')).replace('.', '').replace('?', '').replace(',', '').replace("'", '').replace('!', '').replace('-', '')
        print(original)
        targets = original.replace(' ', '  ')
        targets = targets.split(' ')

        # Adding blank label
        targets = np.hstack([SPACE_TOKEN if x == '' else list(x) for x in targets])

        # Transform char into index
        targets = np.asarray([SPACE_INDEX if x == SPACE_TOKEN else ord(x) - FIRST_INDEX
                            for x in targets])

        # Creating sparse representation to feed the placeholder
        train_targets = self.__sparse_tensor_to_strs([targets])

        return train_targets, original
    
    def __sparse_tuple_from(self, sequences, dtype=np.int32):
        indices = []
        values = []

        for n, seq in enumerate(sequences):
            indices.extend(zip([n] * len(seq), range(len(seq))))
            values.extend(seq)

        indices = np.asarray(indices, dtype=np.int64)
        values = np.asarray(values, dtype=dtype)
        shape = np.asarray([len(sequences), np.asarray(indices).max(0)[1] + 1], dtype=np.int64)

        return indices, values, shape

    def __sparse_tensor_to_strs(self, sparse_tensor):

        finalstrs = []
    
        for item in sparse_tensor:

            indices= item[0]
            values = item[1]
            dense_shape = item[2]

            strs = [ [] for i in range(dense_shape[0]) ]

            string = []
            ptr = 0
            b = 0

            for idx in range(len(indices)):
                if indices[idx][0] != b:
                    strs[b] = string
                    string = []
                    b = indices[idx][0]

                string.append(values[ptr])

                ptr = ptr + 1

            strs[b] = string
            finalstrs.extend(strs)

        return finalstrs


    def __pad_sequences(self, sequences, maxlen=None, dtype=np.float32,
                    padding='post', truncating='post', value=0.):
        lengths = np.asarray([len(s) for s in sequences], dtype=np.int64)

        nb_samples = len(sequences)
        if maxlen is None:
            maxlen = np.max(lengths)

        # take the sample shape from the first non empty sequence
        # checking for consistency in the main loop below.
        sample_shape = tuple()
        for s in sequences:
            if len(s) > 0:
                sample_shape = np.asarray(s).shape[1:]
                break

        x = (np.ones((nb_samples, maxlen) + sample_shape) * value).astype(dtype)
        for idx, s in enumerate(sequences):
            if len(s) == 0:
                continue  # empty list was found
            if truncating == 'pre':
                trunc = s[-maxlen:]
            elif truncating == 'post':
                trunc = s[:maxlen]
            else:
                raise ValueError('Truncating type "%s" not understood' % truncating)

            # check `trunc` has expected shape
            trunc = np.asarray(trunc, dtype=dtype)
            if trunc.shape[1:] != sample_shape:
                raise ValueError('Shape of sample %s of sequence at position %s is different from expected shape %s' %
                                (trunc.shape[1:], idx, sample_shape))

            if padding == 'post':
                x[idx, :len(trunc)] = trunc
            elif padding == 'pre':
                x[idx, -len(trunc):] = trunc
            else:
                raise ValueError('Padding type "%s" not understood' % padding)
        return x, lengths


    def __word_separator(self):
        return '\t'

    def __levenshtein(self,a,b):
        "Computes the Levenshtein distance between a and b."
        n, m = len(a), len(b)

        if n > m:
            a,b = b,a
            n,m = m,n

        current = range(n+1)
        for i in range(1,m+1):
            previous, current = current, [i]+[0]*n
            for j in range(1,n+1):
                add, delete = previous[j]+1, current[j-1]+1
                change = previous[j-1]
                if a[j-1] != b[i-1]:
                    change = change + 1
                current[j] = min(add, delete, change)

        return current[n]


    def __edit_distance(self, a,b,EOS=-1,PAD=-1):
        _a = [s for s in a if s != EOS and s != PAD]
        _b = [s for s in b if s != EOS and s != PAD]

        return self.__levenshtein(_a,_b)


    def __normalize(self, image):
        return (255. - image)/255.


    def __resize(self, image, height):
        width = int(float(height * image.shape[1]) / image.shape[0])
        sample_img = cv2.resize(image, (width, height))
        return sample_img
    
    def __decodebase64Img(self, imageToDecode):
        decoded_img = imread(io.BytesIO(base64.b64decode(imageToDecode)))
        return np.array(decoded_img)

