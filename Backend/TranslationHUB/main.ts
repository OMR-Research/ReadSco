import API from './API'
import BasicHTTPController from './controllers/HTTPController'

const port = process.env.PORT || 3000;

let application = new API( [ new BasicHTTPController() ] , +port);

application.Listen();