from Controllers.SocketServerController import initSocketServer


initSocketServer()


#@socketio.on('connect')
#def handleConnection():
#    print('[SUCCESS] - Microservice connected to this socket')  #  We print a success entry to verify the connection TODO: create a log system

#@socketio.on('cli_ping')
#def sendSalutation(message):
#    print('[SUCCESS] - I have been saluted by the new client')
#    emit('salutation', 'I am the Python Service, I salute you')
#
#@socketio.on('disconnect')
#def handleDisconnection():
#    print('[SUCCESS] - Microservice disconnected of this socket')
#
#@socketio.on('js_partitureEval')                                # The event to start our partiture evaluation system is 'js_partitutreEval'
#def saluteyourfriend(message):
#    print(message)
#    response = {"id": message["id"], "message": 'Catched message friend, all working correctly'}
#    emit('py_responsePartitureEval', response, json=True)

    
#socketio.run(app, host= '0.0.0.0') #We start running our application