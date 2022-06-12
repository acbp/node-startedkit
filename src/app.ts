import express from 'express'; // gestão de rotas - https://expressjs.com/en/guide/routing.html
import dotenv from "dotenv-safe";
import Middleware from './middleware';
import Routes from './routes/index';

const { PORT } = dotenv.config().required

export default class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        Middleware(this);
        Routes(this);
    }

    public middleware(middleware: any): App {
        this.server.use(middleware)
        return this;
    }

    public route(router: express.Router): App {
        this.server.use(router)
        return this;
    }

    public listen(): App {
        this.server.listen(PORT, () => `Running on ${PORT} !`);
        return this;
    }
}
