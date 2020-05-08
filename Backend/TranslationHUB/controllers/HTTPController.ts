import multer from "multer";
import express from "express";
import EventManager from './EventManager'
import ConnectionStorage from "../managers/ConnectionStorage";
import ServiceStorage from "../managers/ServicesStorage";

class BasicHTTPController
{
    private storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './temp')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
        }
      });

    private upload = multer({ storage: this.storage })

    private m_router: express.Router = express.Router();

    private m_eventManager : EventManager;

    constructor()
    {
        this.InitRouting();
        this.m_eventManager = new EventManager(new ConnectionStorage(), new ServiceStorage())
    }

    private InitRouting()
    {
        this.m_router.get('/ping', this.ping);
        this.m_router.get('/pipelines', this.getPipelines)
        this.m_router.get('/services', this.getServices)
        this.m_router.post('/evalScore', this.upload.single("image"), this.evalScore);
        this.m_router.post('/scoreResult', this.scoreResult);
        this.m_router.post('/registerPipeline', this.registerPipeline);
        
    }

    ping = (req : express.Request, res: express.Response)=>
    {
        res.send('Pong');
    }

    evalScore = (req: express.Request, res: express.Response)=>
    {
        console.log('Received eval notification');
        let image = req.body.image;
        const pipeline = req.body.pipelines;
        
        this.m_eventManager.startLayoutAnalysis(image, res);
    }

    scoreResult = (req: express.Request, res: express.Response)=>
    {
        console.log("Finished score eval");
        this.m_eventManager.sendResponse(req.body)
        res.send("ACK")
    }

    registerPipeline = (req: express.Request, res: express.Response)=>
    {
        console.log("Registering a new pipeline into ReadSco");
        try
        {
            console.log(req.body);
            this.m_eventManager.registerNewPipeline(req.body);
            res.status(200).send("Working pipeline has been registered correctly")
        }
        catch(error)
        {
            console.log("Error")
            console.log(error);
            res.status(404).send({response: "There was an error registering the service"});
        }
    }

    getPipelines = (req: express.Request, res: express.Response) =>
    {
        console.log('Getting pipelines');
        res.status(200).send({pipelines: this.m_eventManager.getOMRPipelines()});
    }

    getServices = (req: express.Request, res: express.Response) =>
    {
        console.log('Getting services available');
        res.status(200).send({services: this.m_eventManager.getReadScoServices()});
    }

    getRouter()
    {
        return this.m_router;
    }
}

export default BasicHTTPController;