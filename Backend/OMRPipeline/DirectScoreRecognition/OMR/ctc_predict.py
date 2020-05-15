import cv2
import numpy as np
from keras.models import load_model
import itertools

fixed_height = 64

class Predictor:

    def __init__(self):
        self.i2w = np.load("OMR/vocabulary/skerni2w.npy", allow_pickle=True).item()
        self.model = load_model("OMR/model/skern_model.h5")
        self.model.summary()
        self.model._make_predict_function()

    def predict(self, img):
        img = (255. - img) / 255.
        width = int(float(fixed_height * img.shape[1]) / img.shape[0])
        img = cv2.resize(img, (width, fixed_height))
        pred = self.model.predict(np.expand_dims(np.expand_dims(img,axis=0),axis=-1))[0]

        out_best = np.argmax(pred,axis=1)
        out_best = [k for k, g in itertools.groupby(list(out_best))]
        decoded = []
        for c in out_best:
            if c < len(self.i2w):  # CTC Blank must be ignored
                decoded.append(self.i2w[c])
        
        return decoded
        