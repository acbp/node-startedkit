/* istanbul ignore file */
// importando dependencias do projeto
const apm = require('express-status-monitor'); // https://github.com/RafalWilinski/express-status-monitor
const dotenv = require('dotenv-safe'); // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe

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
      path: '/',
      host: config.HOST,
      port: config.PORT,
    },
    {
      protocol: 'http',
      path: '/coverage',
      host: config.HOST,
      port: config.PORT,
    },
  ],
};

console.debug('apm OK !');
module.exports = () => apm(apmConfig);
