const express = require('express'); // gestão de rotas - https://expressjs.com/en/guide/routing.html
const cors = require('cors'); // cross origin resource share - https://github.com/expressjs/cors
const helmet = require('helmet'); // segurança - https://helmetjs.github.io/
const dotenv = require('dotenv-safe'); // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe
const logger = require('./utils/logger.js');
const routes = require('./routes/index.js');

const app = express();

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
      defaultSrc: ["'self' 'unsafe-inline' ", 'localhost', 'cdnjs.cloudflare.com'], // permite acesso aos docs
    },
  },
}));

routes(app, config);

const logRunnig = () => console.debug(`Running at ${HOST}:${PORT}`);

module.exports.app = app;
module.exports.server = () => app.listen(PORT, HOST, logRunnig);
