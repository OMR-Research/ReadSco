import * as socketClient from 'socket.io-client'
import * as jwt from 'jsonwebtoken';
import ConnectionStorage from './../connectionManagement/ConnectionStorage'
import { response } from 'express';

class PythonSocket
{
    private m_socket : SocketIOClient.Socket;
    private m_storage : ConnectionStorage;
    
    constructor(path:string)
    {
        this.m_storage = new ConnectionStorage();
        this.m_socket = socketClient.connect(path)
        this.InitSocketHandlers();
        console.log('Socket created!')
    }

    private InitSocketHandlers()
    {
        this.m_socket.on('connect', this.ConnectionMessage);
        this.m_socket.on('error', this.ErrorMessage);
        this.m_socket.on('connect_error', this.ConnectionError);
        this.m_socket.on('py_responseScoreEval', this.ProccessOMRResult);
    }

    ConnectionMessage = ()=>
    {
        console.log('Someone connected to my socket!');
    }

    ErrorMessage = ()=>
    {
        console.log("There was an error");
    }

    ConnectionError = ()=>
    {
        console.log("There was an error connecting to the other socket");
    }

    ProccessOMRResult = (message: any)=>
    {
        let responseObject = this.m_storage.Fetch(message.id);
        if(responseObject != undefined)
        {
            responseObject.status(200).send(message.message);
        }
    }

    Emit = (c_state: string, c_message: string, responseObject: Express.Response)=>
    {
        let messageToken = this.GenerateToken();
        this.m_storage.Store(messageToken, responseObject);
        this.m_socket.emit(c_state, {id: messageToken, message: c_message});
    }

    private GenerateToken()
    {
        let randomString = Math.random().toString(36).substring(7);
        let dateNow = new Date().toString();
        return jwt.sign({_id: randomString, dateNow}, 'abc123');
    }
}

export default PythonSocket;