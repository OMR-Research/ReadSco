from flask import Flask, escape, request
from OMRLayout.predictor import LayoutAnalysis
import requests
import json

app = Flask(__name__)                                           #|                         #|

predictor = LayoutAnalysis()

@app.route('/layoutAnalyze', methods=['POST'])
def predictLayout():
    message = request.json
    print('[SUCCESS] - Layout Analysis request received')
    image, boundings = predictor.predict(message["image"])
    response = {"id": message["id"], "image": message["image"], "boundings": boundings}
    print('[SUCCESS] - Layout Analysis finished')
    requests.post('http://scorerecognition:5006/scoreRecognition', json=response)
    return "ACK", 200

def initServer():
    app.run(host= '0.0.0.0', port=5005)

