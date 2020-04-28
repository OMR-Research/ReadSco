from flask import Flask, escape, request
from flask_socketio import SocketIO, Namespace, send, emit, disconnect
from OMRLayout.predictor import LayoutAnalysis
from Controllers.SocketServerClient import send_result

app = Flask(__name__)                                           #|
app.config['SECRET_KEY'] = 'secret!'                            #|

socketServer = SocketIO(app, async_mode="threading")

predictor = LayoutAnalysis()

@socketServer.on('pingla')
def responseping():
    print('[SUCCESS] - Got the message pal')

@socketServer.on('layoutAnalyze')
def predictLayout(message):
    print('[SUCCESS] - Layout Analysis request received')
    image, boundings = predictor.predict(message["message"])
    response = {"id": message["id"], "image": image.tolist(), "boundings": boundings}
    print('[SUCCESS] - Layout Analysis finished')
    #send_result(response)
    socketServer.emit('layoutAnalysisEnd', response)

@socketServer.on('connect')
def handleConnection():
    print('[SUCCESS] - Microservice connected to this socket')

@socketServer.on('disconnect')
def handleDisconnection():
    print('[SUCCESS] - Microservice disconnected of this socket')

def initServer():
    socketServer.run(app, host= '0.0.0.0', port=5005)

