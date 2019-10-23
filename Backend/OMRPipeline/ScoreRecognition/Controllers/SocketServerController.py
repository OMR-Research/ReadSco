from flask import Flask, escape, request
from flask_socketio import SocketIO, Namespace, send, emit, disconnect
from Controllers.ResultTransmissor import send_result_to_JSServer
from Controllers.HTTPClient import SendEncodingRequest
from OMR.ctc_predict import Predictor

import numpy as np

app = Flask(__name__)                                           #|
app.config['SECRET_KEY'] = 'secret!'                            #|

socketServer = SocketIO(app, async_mode="threading")

predictor = Predictor()

@socketServer.on('connect')
def handleConnection():
    print('[SUCCESS] - Microservice connected to this socket')  #  We print a success entry to verify the connection TODO: create a log system

@socketServer.on('cli_ping')
def sendSalutation(message):
    print('[SUCCESS] - I have been saluted by the new client')
    emit('salutation', 'I am the Python Service, I salute you')

@socketServer.on('disconnect')
def handleDisconnection():
    print('[SUCCESS] - Microservice disconnected of this socket')

@socketServer.on('scoreRecognition')                                # The event to start our score evaluation system is 'js_partitutreEval'
def sendResultToJS(message):

    imageToCrop = message["image"]
    boundings = message["boundings"]

    imageToCrop = np.array(imageToCrop)
    
    results = []  

    for bounding in boundings:
        crop = imageToCrop[bounding[0]:bounding[1],]
        prediction = predictor.make_prediction(crop)
        results.append(prediction)
    #SendEncodingRequest(message["id"], prediction)
    response = {"id": message["id"], "message": results}
    send_result_to_JSServer(response)

def initSocketServer():
    socketServer.run(app, host= '0.0.0.0', port=5006)
