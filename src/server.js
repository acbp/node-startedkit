import express from 'express'; // gestão de rotas - https://expressjs.com/en/guide/routing.html
import cors from 'cors'; // cross origin resource share - https://github.com/expressjs/cors
import helmet from 'helmet'; // segurança - https://helmetjs.github.io/
import dotenv from 'dotenv-safe'; // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe
import logger from './utils/logger.js';
import routes from './routes/index.js';

export const app = express();

/* https://github.com/expressjs/cors#configuration-options */
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 dia
};

const configOptions = {
  allowEmptyValues: true,
};
const config = dotenv.config(configOptions).required;
const { PORT } = config;
const { HOST } = config;

console.debug('loaded config');

logger({ config });

app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self' 'unsafe-inline' 'unsafe-eval' 'nonce-rAnd0m123'", 'localhost'], // permite acesso aos docs
    },
  },
}));

routes(app, config);

const logRunnig = () => console.debug(`Running at ${HOST}:${PORT}`);

export default () => app.listen(PORT, HOST, logRunnig);
