from flask import Flask, escape, request
from OMR.ctc_predict import Predictor
import numpy as np
import requests
import cv2
from imageio import imread
import io
import base64
from .Eureka import register_eurekaservice


app = Flask(__name__)                                           #|

predictor = Predictor()

@app.route('/getSymbols', methods=['POST'])                                # The event to start our score evaluation system is 'js_partitutreEval'
def sendResultToJS():
    message = request.json
    imageToCrop = decodebase64Img(message["image"])
    imageToCrop = cv2.cvtColor(imageToCrop, cv2.COLOR_BGR2GRAY)
    boundings = message["boundings"]

    imageToCrop = np.array(imageToCrop)
    
    results = []  

    for bounding in boundings:
        crop = imageToCrop[bounding[0]:bounding[1],]
        prediction = predictor.make_prediction(crop)
        results.append(prediction)
    
    response = {"id": message["id"], "message": results}
    requests.post('http://readsco:8011/translationhub/scoreResult', response)
    return "ACK", 200

def initSocketServer():
    register_eurekaservice()
    app.run(host='0.0.0.0', port=5006)

def decodebase64Img(imageToDecode):
        decoded_img = imread(io.BytesIO(base64.b64decode(imageToDecode)))
        return np.array(decoded_img)