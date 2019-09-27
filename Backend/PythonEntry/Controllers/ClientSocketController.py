from socketIO_client import SocketIO, LoggingNamespace

def on_salutation(message):
    print('I have been saluted by the server')
    print(message)

def emit_message_to_OMRMS(status, message):
    clientSocket = SocketIO('127.0.0.1', 8000, LoggingNamespace)
    clientSocket.emit(status, message)
    clientSocket.disconnect()

#clientSocket.on('salutation', on_salutation)