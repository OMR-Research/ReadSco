from socketIO_client import SocketIO, LoggingNamespace

def on_salutation(message):
    print('I have been saluted by the server')
    print(message)

def emit_message_to_OMRMS(status, message):
    clientSocket = SocketIO('layoutanalysis', 5005, LoggingNamespace)
    clientSocket.emit(status, message)
    clientSocket.disconnect()

#clientSocket.on('salutation', on_salutation)