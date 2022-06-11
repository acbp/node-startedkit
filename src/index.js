/* istanbul ignore file */
// importando dependencias do projeto
const apm = require('express-status-monitor'); // https://github.com/RafalWilinski/express-status-monitor
const dotenv = require('dotenv-safe'); // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe
const express = require('express');

const { server, app } = require('./server.js');

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
app.use('/', express.static('doc'));

/**
 * @apiGroup Services
 * @apiName Cobertura de código
 *
 * @api {get} /coverage Cobertura de código da API
 * @apiDescription Exibe cobertura de código da API
 */
app.use('/coverage', express.static('coverage'));

server();
