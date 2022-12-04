const express = require('express');
const healthCheck = require('./healthcheck/index.js');
const apm = require('../utils/apm.js');

module.exports = (app) => {
  healthCheck(app);

  /**
   * @apiGroup Services
   * @apiName Monitor
   *
   * @api {get} /status Monitor
   * @apiDescription Monitora os recuros do servidor
   */
  app.use(apm());

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

  console.debug('routes OK !');
};
