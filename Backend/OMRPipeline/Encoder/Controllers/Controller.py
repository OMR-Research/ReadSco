from flask import Flask, escape, request
from .Eureka import register_eurekaservice
from OMREncoder.predictor import Encoder
import requests
import json

app = Flask(__name__)                                           #|                         #|

predictor = Encoder()
#predictor = LayoutAnalysis()

#@app.route('/layoutAnalyze', methods=['POST'])
#def predictLayout():
#    message = request.json
#    print('[SUCCESS] - Layout Analysis request received')
#    image, boundings = predictor.predict(message["image"])
#    response = {"id": message["id"], "image": message["image"], "boundings": boundings}
#    print('[SUCCESS] - Layout Analysis finished')
#    requests.post('http://readsco:8011/scorerecognition/getSymbols', json=response)
#    return "ACK", 200

@app.route('/translate', methods=['POST'])
def makeTranslation():
    message = request.json
    print('[SUCCESS] - Layout Analysis request received')
    kernSentence = predictor.predict(message["sentence"])
    print('[SUCCESS] - Translation works correctly')
    print(kernSentence)
    response = {"id": message["id"], "message": kernSentence}
    #requests.post('http://readsco:8011/translationhub/scoreResult', response)
    return "ACK", 200

@app.route('/ping', methods=['GET'])
def ping():
    return "Pong", 200

def initServer():
    register_eurekaservice()
    app.run(host= '0.0.0.0', port=5007)

