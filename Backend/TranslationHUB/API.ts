import express from "express"
import * as bodyparser from "body-parser"
import BasicHTTPController from './controllers/HTTPController'

class API 
{
    public p_api = express.application;
    private m_port: number;

    constructor(controllers: any, port: number)
    {
        this.p_api = express();
        this.m_port = port;
        this.InitMiddleWare();
        this.InitControllers(controllers);
    }

    private InitMiddleWare()
    {
        this.p_api.use(bodyparser.json());
        this.p_api.use(bodyparser.urlencoded({extended: true}));
        console.log("Middleware stablished");
    }

    private InitControllers(c_controllers: any)
    {
        c_controllers.forEach((controller:BasicHTTPController) => {
            this.p_api.use('/' , controller.getRouter())
        });

        console.log("Routing stablished");
    }

    public Listen()
    {
        this.p_api.listen(this.m_port, ()=> {
            console.log('App listening to port ' + this.m_port);
        })
    }
}

export default API;