import multer from "multer";
import express from "express";
import EventManager from './EventManager'
import ConnectionStorage from "../connectionManagement/ConnectionStorage";

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
        this.m_eventManager = new EventManager(new ConnectionStorage())
    }

    private InitRouting()
    {
        this.m_router.get('/ping', this.ping);
        this.m_router.post('/evalScore', this.upload.single("image"), this.evalScore);
        this.m_router.post('/scoreResult', this.scoreResult)
    }

    ping = (req : express.Request, res: express.Response)=>
    {
        res.send('Pong');
    }

    evalScore = (req: express.Request, res: express.Response)=>
    {
        console.log('Received eval notification');
        let image = req.body.image;
        this.m_eventManager.startLayoutAnalysis(image, res);
    }

    scoreResult = (req: express.Request, res: express.Response)=>
    {
        console.log("Finished score eval");
        this.m_eventManager.sendResponse(req.body)
    }

    getRouter()
    {
        return this.m_router;
    }
}

export default BasicHTTPController;