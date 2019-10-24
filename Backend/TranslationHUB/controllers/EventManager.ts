import ConnectionStorage from "../connectionManagement/ConnectionStorage";
import LayoutAnalysisSocket from "./LayoutAnalysisSocket";
import * as jwt from 'jsonwebtoken';
import { response } from 'express';

class EventManager
{
    private m_layoutAnalysisSocket : LayoutAnalysisSocket;
    private connectionStorage : ConnectionStorage;
    
    constructor(storage : ConnectionStorage)
    {
        this.connectionStorage = storage
        this.m_layoutAnalysisSocket = new LayoutAnalysisSocket('ws://layoutanalysis:5005', storage, this)
    }

    startLayoutAnalysis(message: any, responseObject : Express.Response)
    {
        let messageToken = this.GenerateToken();
        this.connectionStorage.Store(messageToken, responseObject);
        this.m_layoutAnalysisSocket.StartLA('layoutAnalyze', message, messageToken);
    }

    private GenerateToken()
    {
        let randomString = Math.random().toString(36).substring(7);
        let dateNow = new Date().toString();
        return jwt.sign({_id: randomString, dateNow}, 'abc123');
    }

    startScoreRecognition(message: any)
    {
        this.m_layoutAnalysisSocket.StartSR('scoreRecognition', message)
    }

    sendResponse(message: any)
    {
        let responseObject = this.connectionStorage.Fetch(message.id);
        if(responseObject != undefined)
        {
            responseObject.status(200).send({"response": message.message});
        }
    }


}

export default EventManager