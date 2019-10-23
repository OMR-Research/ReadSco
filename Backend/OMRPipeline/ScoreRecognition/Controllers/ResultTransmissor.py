from socketIO_client import SocketIO, LoggingNamespace

def error(error):
    print(error)

def send_result_to_JSServer(message):
    print(message)
    clientSocket = SocketIO('ws://eventmanager', 5000, LoggingNamespace)
    clientSocket.emit('response_to_cli', message)
    clientSocket.disconnect()
    
    