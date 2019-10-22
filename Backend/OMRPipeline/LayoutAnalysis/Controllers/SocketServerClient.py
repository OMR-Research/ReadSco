from socketIO_client import SocketIO, LoggingNamespace

def error(error):
    print(error)

def send_result(message):
    clientSocket = SocketIO('scorerecognition', 5006, LoggingNamespace)
    clientSocket.emit('scoreRecognition', message)
    clientSocket.disconnect()