from keras.models import load_model
import numpy as np
import tensorflow as tf
import io

class Encoder:

    modelPath = "OMREncoder/model/model2.h5"
    dictionary_path = "OMREncoder/vocabulary/"

    def __init__(self):
        print('Initializing encoder:')
        self.model = load_model(self.modelPath)
        self.model.summary()
        self.model._make_predict_function()
        self.w2iagnostic = np.load(self.dictionary_path + "w2iagnostic.npy", allow_pickle = True).item()
        self.i2wkern = np.load(self.dictionary_path + "i2wkern.npy", allow_pickle=True).item()

        print('Initialized!!')
    
    def predict(sequence_raw):
        sequence = []
        for element in sequence_raw:
            sequence.append(self.w2iagnostic[element])

        decoded = [0]
        predicted = []

        for i in range(1, 500):
            decoder_input = np.asarray([decoded])
        
            prediction = model.predict([[sequence], decoder_input])
            decoded.append(0)

            if i2wtarget[np.argmax(prediction[0][-1])] == '</s>':
                break
        
            predicted.append(self.i2wkern[np.argmax(prediction[0][-1])])

        return predicted


    

