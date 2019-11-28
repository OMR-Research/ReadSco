import ConnectionStorage from "../connectionManagement/ConnectionStorage";
import * as jwt from 'jsonwebtoken'; 
import * as axios from 'axios'

class EventManager
{
    private connectionStorage : ConnectionStorage;
    
    constructor(storage : ConnectionStorage)
    {
        this.connectionStorage = storage
    }

    startLayoutAnalysis(message: any, responseObject : Express.Response)
    {
        let messageToken = this.GenerateToken();

        this.connectionStorage.Store(messageToken, responseObject)
        
        const data = {
            id: messageToken, 
            image: message
        }

        axios.default.post("http://layoutanalysis:5005/layoutAnalyze", data).then((res)=>{})
    }

    private GenerateToken()
    {
        let randomString = Math.random().toString(36).substring(7);
        let dateNow = new Date().toString();
        return jwt.sign({_id: randomString, dateNow}, 'abc123');
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