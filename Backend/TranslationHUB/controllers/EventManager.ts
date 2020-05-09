import ConnectionStorage from "../managers/ConnectionStorage";

import * as jwt from 'jsonwebtoken'; 
import * as axios from 'axios'
import ServiceStorage from "../managers/ServicesStorage";
import PipelineStorage from "../managers/PipelineStorage";


class EventManager
{
    private connectionStorage : ConnectionStorage;
    private serviceStorage: ServiceStorage;
    private pipelineStorage: PipelineStorage;
    
    constructor(storage : ConnectionStorage, servicesS : ServiceStorage)
    {
        this.connectionStorage = storage
        this.serviceStorage = servicesS;
        this.pipelineStorage = new PipelineStorage();

        setTimeout(this.askEurekaForServices, 50000, this.serviceStorage);
    }

    private askEurekaForServices(storage:ServiceStorage)
    {
        console.log("Requesting currently registered microservices...");
        axios.default.get("http://discoveryservice:8010/eureka/apps").then((res)=>{
            res.data['applications']['application'].forEach((application:any) => {
                storage.StoreService(application['name']);
            });
        }).catch((err)=>{
            console.log(err);
        })
    }

    startScoreAnalysis(message: any, instructions:any, responseObject : Express.Response)
    {
        let messageToken = this.GenerateToken();

        this.connectionStorage.Store(messageToken, responseObject)
        
        const nextDirection = instructions[0]
        console.log(nextDirection)
        instructions.splice(0,1);

        const data = {
            id: messageToken, 
            image: message,
            pipeline: instructions
        }

        axios.default.post("http://readsco:8011/"+ nextDirection +"/in", data).then((res)=>{})
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

    registerNewPipeline(data:any)
    {
        this.pipelineStorage.RegisterPipeline(data.name, data.workflow, this.serviceStorage);
    }

    getOMRPipelines()
    {
        return this.pipelineStorage.GetAllPipelineNames();
    }

    getPipelineInstructions(name:string)
    {
        return this.pipelineStorage.GetPipelineInstructions(name);
    }

    getReadScoServices()
    {
        return this.serviceStorage.GetServices();
    }

}

export default EventManager