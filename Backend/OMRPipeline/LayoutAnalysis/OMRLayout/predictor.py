from keras.models import load_model
from imageio import imread
import numpy as np
import tensorflow as tf
import io
import base64
import cv2

FEATURES = 1024

class LayoutAnalysis:

    modelPath = "OMRLayout/model/model_architecture.h5"

    def __init__(self):
        print('Initializing layout analysis:')
        self.model = load_model(self.modelPath)
        self.model.summary()
        self.model._make_predict_function()
        print('Initialized!!')
    
    def predict(self, image):
        originalImage = self.__decodebase64Img(image)
        originalImage = cv2.cvtColor(originalImage, cv2.COLOR_BGR2GRAY)
        imageToPredict, processed = self.__prepareImage(originalImage)
        prediction = self.model.predict(imageToPredict)
        self.__make_comparison(processed, prediction[0])
        boundings = self.__get_boundingBoxes(processed, prediction)

        definitiveBoundings = []
        i = 0
        while i < len(boundings):
            targetBounding = boundings[i]
            if i < len(boundings) - 1:
                nextBounding = boundings[i + 1]
            else:
                nextBounding = targetBounding
            
            distance = nextBounding[0] - targetBounding[1]
            if distance < 0: #We crossed boundings, it's a jump we must correct
                definitiveBoundings.append([targetBounding[0], nextBounding[1]])
                i += 2
            else:
                definitiveBoundings.append(targetBounding)
                i += 1

        return processed, definitiveBoundings


    def __decodebase64Img(self, imageToDecode):
        decoded_img = imread(io.BytesIO(base64.b64decode(imageToDecode)))
        return np.array(decoded_img)
    
    def __prepareImage(self, image):
        height = int(float(FEATURES * image.shape[0]) / image.shape[1])
        final_image = cv2.resize(image, (FEATURES, height))
        final_image = (255. - final_image)/255.

        dilation_kernel = np.ones((3,3), np.uint8)
        processed_image = cv2.dilate(final_image, kernel= dilation_kernel, iterations= 2)

        return np.expand_dims(np.array(processed_image), 0), final_image
    
    def __get_boundingBoxes(self,image,prediction):
        prediction = prediction[0]
        prediction[prediction < 0.5] = 0
        prediction[prediction > 0] = 1

        #Initialize indexes
        top = -1
        bottom = -1

        boundingBoxes = []

        self.__make_comparison(image, prediction)

        for i in range(prediction.shape[0]):
            if prediction[i] == 1.0 and top == -1:
                top = i
            if prediction[i] == 0.0 and top != -1:
                bottom = i
                height = bottom - top
                if height > 20:
                    heightToApply = int( height / 1.5) 
                    boundingBoxes.append([top - heightToApply, bottom + heightToApply])
                    top = -1
                    bottom = -1
        return boundingBoxes

    def __make_comparison(self,image, gt):
        image = 255. * image
        gt = 255. * gt
        result = np.concatenate((image,gt), axis=1)
        cv2.imwrite("OMRLayout/results/complete.png", result)

