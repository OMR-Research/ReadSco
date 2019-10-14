from flask import Flask, escape, request
from flask_socketio import SocketIO, Namespace, send, emit, disconnect
from Controllers.ClientSocketController import emit_message_to_OMRMS

app = Flask(__name__)                                           #|
app.config['SECRET_KEY'] = 'secret!'                            #|

socketServer = SocketIO(app, async_mode="threading")

@socketServer.on('connect')
def handleConnection():
    print('[SUCCESS] - Microservice connected to this socket')  #  We print a success entry to verify the connection TODO: create a log system

@socketServer.on('cli_ping')
def sendSalutation(message):
    print('[PING] - Received ping through websocket')
    emit('serv_pong', 'Entry Python microservice acknowledged your call')

@socketServer.on('disconnect')
def handleDisconnection():
    print('[SUCCESS] - Microservice disconnected of this socket')

@socketServer.on('js_scoreEval')                                # The event to start our partiture evaluation system is 'js_partitutreEval'
def sendRequestToOMR(message):
    #print(message)
    emit_message_to_OMRMS('layout_analyze', message)
    #response = {"id": message["id"], "message": 'Catched message friend, all working correctly'}
    #emit('py_responsePartitureEval', response, json=True)
@socketServer.on('response_to_cli')
def responseToClient(message):
    response = {"id": message["id"], "message": message["message"]}
    print(message)
    emit('py_responseScoreEval', response, broadcast=True, json=True)

def initSocketServer():
    socketServer.run(app, host='127.0.0.1', port=5000) #Everything gets blocked from here

