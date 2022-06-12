import express from 'express'; // gestão de rotas - https://expressjs.com/en/guide/routing.html
import dotenv from "dotenv-safe";

const {PORT} = dotenv.config().required

export default class App {
    public server: express.Application;

    constructor() {
        this.server = express();
    }

    public middleware( middleware:any ) {
        this.server.use(middleware)
    }

    public router( router:express.Router ) {
        this.server.use(router)
    }

    public listen(){
       this.server.listen(PORT, () => `Running on ${PORT} !`); 
    }
}
