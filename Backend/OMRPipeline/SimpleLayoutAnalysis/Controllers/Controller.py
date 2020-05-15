from flask import Flask, escape, request
from OMRLayout.predictor import SimpleLayoutAnalysis
from .Eureka import register_eurekaservice
import requests
import json

app = Flask(__name__)                                          

predictor = SimpleLayoutAnalysis()

@app.route('/in', methods=['POST'])
def predictLayout():
    message = request.json
    print('[SUCCESS] - Layout Analysis request received')
    boundings = predictor.predict(message["image"])
    nextLocation = message["pipeline"][0]
    print(nextLocation)
    arrayToSend = message["pipeline"]
    arrayToSend.remove(nextLocation)
    response = {"id": message["id"], "image": message["image"], "boundings": boundings, "pipeline": arrayToSend}
    if nextLocation == '<end>':
        requests.post('http://readsco:8011/translationhub/scoreResult', json=response)
    else:
        requests.post('http://readsco:8011/' + nextLocation +'/in', json=response)
    
    print('[SUCCESS] - Layout Analysis finished')
    return response

@app.route('/ping', methods=['GET'])
def ping():
    return "Pong", 200

def initServer():
    register_eurekaservice()
    app.run(host= '0.0.0.0', port=5005)

