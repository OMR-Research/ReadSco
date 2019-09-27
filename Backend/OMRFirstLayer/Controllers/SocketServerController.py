from flask import Flask, escape, request
from flask_socketio import SocketIO, Namespace, send, emit, disconnect
from Controllers.ResultTransmissor import send_result_to_JSServer
from Controllers.HTTPClient import SendEncodingRequest
from OMR.ctc_predict import Predictor

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

@socketServer.on('scoreTranslation')                                # The event to start our partiture evaluation system is 'js_partitutreEval'
def sendResultToJS(message):
    prediction = predictor.make_prediction(message["message"])
    prediction = predictor.benchmark_beamdecoder(message["message"])
    #SendEncodingRequest(message["id"], prediction)
    response = {"id": message["id"], "message": prediction}
    send_result_to_JSServer(response)

def initSocketServer():
    socketServer.run(app, host= '127.0.0.1', port=8000)
