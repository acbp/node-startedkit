/* istanbul ignore file */
/**
 * Exemplo de Barrel
 *
 * @description Um barrel serve para centralizar todas as importações e
 * distribuir para diversos serviços da aplicação de um só vez,
 * ser ter que ficar reimportado a configuração para cada arquivo.
 * Facilitando assim a manutenção e atualização do projeto.
 *  https://srinivasankk.com/javascript-barrel/
 */

// importando dependencias do projeto
import { cpus } from 'os';
import process from 'process';
import cluster from 'cluster';
import apm from 'express-status-monitor'; // https://github.com/RafalWilinski/express-status-monitor
import dotenv from 'dotenv-safe'; // configuração do ambiente - https://www.npmjs.com/package/dotenv-safe
import express from 'express';

import server, { app } from './server.js';

const config = dotenv.config().parsed;
const clusterMode = config.CLUSTER;

/* istanbul ignore if */
/* istanbul ignore else */
/* istanbul ignore next */
if (!cluster.isWorker) {
  process.on('SIGHUP', () => {
    console.debug('exit');
    console.timeEnd(`worker-${process.pid}`);
    const array = Object.values(cluster.workers);
    for (let index = 0; index < array.length; index++) {
      const worker = array[index];
      worker.process.kill('SIGTERM');
    }
  });
} else {
  process.on('SIGHUP', () => {
    console.timeEnd(`worker-${process.pid}`);
    console.debug('exit');
    process.kill('SIGTERM');
  });
}

console.time(`worker-${process.pid}`);

/* istanbul ignore for */
/* istanbul ignore next */
/* istanbul ignore else */
/* istanbul ignore if */
if (clusterMode) {
  const numCPUs = cpus().length || 0;
  if (!cluster.isWorker) {
    console.debug(`Primary ${process.pid} is running (${numCPUs})`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker /* , code, signal */) => {
      console.timeEnd(`worker-${process.pid}`);
      console.debug(`worker ${worker.process.pid} died`);
    });

    server();
  } else {
    console.debug(`Worker ${process.pid} started`);
  }
} else {
  server();
}
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
