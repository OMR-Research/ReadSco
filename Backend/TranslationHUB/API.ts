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
        this.p_api.use(bodyparser.json({limit: '50mb'}));
        this.p_api.use(bodyparser.urlencoded({extended: true}));
        this.p_api.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();})
        
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