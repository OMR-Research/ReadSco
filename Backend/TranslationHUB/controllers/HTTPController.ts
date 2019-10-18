import multer from "multer";
import express from "express";
import fs from "fs";
import PythonSocket from './PythonSocket'

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

    private m_socket: PythonSocket;

    constructor()
    {
        this.InitRouting();
        this.m_socket = new PythonSocket('http://localhost:5000');
    }

    private InitRouting()
    {
        this.m_router.get('/ping', this.ping);
        this.m_router.post('/evalScore', this.upload.single("image"), this.evalScore);
    }

    ping = (req : express.Request, res: express.Response)=>
    {
        res.send('Pong');
    }

    evalScore = (req: express.Request, res: express.Response)=>
    {
        let image = req.body.image;
        this.m_socket.Emit('js_scoreEval', image, res);
    }

    getRouter()
    {
        return this.m_router;
    }
}

export default BasicHTTPController;