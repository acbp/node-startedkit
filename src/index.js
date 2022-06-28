/* istanbul ignore file */
// importando dependencias do projeto
import apm from 'express-status-monitor'; // https://github.com/RafalWilinski/express-status-monitor
import dotenv from 'dotenv-safe'; // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe
import serverStatic from '@fastify/static'
import { fileURLToPath } from 'url'
import { dirname, join} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import server, { app } from './server.js';

server();

const config = dotenv.config().parsed;

// Monitor da aplicação
const apmConfig = {
  title: 'Express Status', // Default title
  path: '/status',
  spans: [{
    interval: 1, // Every second
    retention: 60, // Keep 60 datapoints in memory
  }, {
    interval: 5, // Every 5 seconds
    retention: 60,
  }, {
    interval: 15, // Every 15 seconds
    retention: 60,
  }],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [
    {
      protocol: 'http',
      host: config.HOST,
      path: '/healthcheck',
      port: config.PORT,
    },
    {
      protocol: 'http',
      host: config.HOST,
      path: '/coverage',
      port: config.PORT,
    },
    {
      protocol: 'http',
      host: config.HOST,
      path: '/',
      port: config.PORT,
    },
  ],
};

/**
 * @apiGroup Services
 * @apiName Monitor
 *
 * @api {get} /status Monitor
 * @apiDescription Monitora os recuros do servidor
 */
app.use(apm(apmConfig));

/**
 * @apiGroup Services
 * @apiName Documentação
 *
 * @api {get} / Documentação da API
 * @apiDescription Exibe documentação da API
 */
//app.use('/', serverStatic('doc'));

//await app.register(serverStatic, {
//  prefix:'/',
//  root:join(__dirname,'../')
//})

/**
 * @apiGroup Services
 * @apiName Cobertura de código
 *
 * @api {get} /coverage Cobertura de código da API
 * @apiDescription Exibe cobertura de código da API
 */
//app.use('/coverage',serverStatic('coverage'));

//const staticIndex = (req,res) => res.sendFile('index.html');
//
//app.get('/doc', (req,res) => res.sendFile('doc/index.html'))
//app.get('/coverage', (req,res) => res.sendFile('coverage/index.html'))

