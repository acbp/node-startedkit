import fastify from 'fastify'; 
import middie from '@fastify/express'; 
import cors from '@fastify/cors'; // cross origin resource share - https://github.com/expressjs/cors
import helmet from '@fastify/helmet'; // segurança - https://helmetjs.github.io/
import dotenv from 'dotenv-safe'; // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe
import logger from './utils/logger.js';
import routes from './routes/index.js';

export const app = fastify()
await app.register(middie)

/* https://github.com/expressjs/cors#configuration-options */
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  maxAge: 30 * 1 * 24 * 60 * 60 * 1000, // 1 dia
};

const configOptions = {
  allowEmptyValues: true,
};
const config = dotenv.config(configOptions).required;
const { PORT } = config;
const { HOST } = config;

console.debug('config OK !');

logger({ config });

await app.register(cors, corsOptions)

console.debug('cors   OK !');

await app.register(helmet,{
  contentSecurityPolicy:false
});

console.debug('helmet OK !');

routes(app, config);

const logRunnig = () => console.debug(`Running at ${HOST}:${PORT}`);

export default () => app.listen({port:PORT, host:HOST });
