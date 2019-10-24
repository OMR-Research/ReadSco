import * as socketClient from 'socket.io-client'
import ConnectionStorage from '../connectionManagement/ConnectionStorage'
import EventManager from './EventManager';

class LayoutAnalysisSocket
{
    private m_socket : SocketIOClient.Socket;
    private m_storage : ConnectionStorage;
    private m_eventManager: EventManager;
    
    constructor(path:string, storage: ConnectionStorage, eventManager : EventManager)
    {
        this.m_storage = storage;
        this.m_eventManager = eventManager;
        console.log('Socket created!')
    }

    private InitSocketHandlers()
    {
        this.m_socket.on('connect', this.ConnectionMessage);
        this.m_socket.on('error', this.ErrorMessage);
        this.m_socket.on('connect_error', this.ConnectionError);
        this.m_socket.on('layoutAnalysisEnd', this.LayoutAnalysisEnd);
        this.m_socket.on('scoreRecognitionEnd', this.ScoreRecognitionEnd)
    }

    saypong = () =>
    {
        console.log('Pong from eventmanager')
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

    LayoutAnalysisEnd = (message: any)=>
    {
        this.m_socket.disconnect()
        this.m_eventManager.startScoreRecognition(message)
    }

    ScoreRecognitionEnd = (message: any)=>
    {
        console.log('Finished Score Recognition')
        this.m_socket.disconnect();
        this.m_eventManager.sendResponse(message)
    }

    StartLA = (c_state: string, c_message: string, messageToken: string)=>
    {
        this.m_socket = socketClient.connect("ws://layoutanalysis:5005")
        this.InitSocketHandlers();
        this.m_socket.emit(c_state, {id: messageToken, message: c_message});
    }

    StartSR = (c_state: string, c_message: any)=>
    {
        this.m_socket = socketClient.connect("ws://scorerecognition:5006")
        this.InitSocketHandlers();
        this.m_socket.emit(c_state, c_message)
    }
}

export default LayoutAnalysisSocket;