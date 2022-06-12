import {json}from 'express';

import apm from './apm';
import doc from './doc';
import cover from './coverage';
import health from './healthcheck';

export default (app:App) => {
    app.route(json());

    /**
     * @apiGroup Services
     * @apiName Monitor
     *
     * @api {get} /status Monitor
     * @apiDescription Monitora os recuros do servidor
     */
    app.route(apm);

    /**
     * @apiGroup Services
     * @apiName Documentação
     *
     * @api {get} / Documentação da API
     * @apiDescription Exibe documentação da API
     */
    app.route(doc);


    /**
     * @apiGroup Services
     * @apiName Saúde
     *
     * @api {get} /health Validação de saúde do servidor.
     * @apiDescription Exibe se o servidor está rodando
     */
    app.route(health);

    /**
     * @apiGroup Services
     * @apiName Cobertura de código
     *
     * @api {get} /coverage Cobertura de código da API
     * @apiDescription Exibe cobertura de código da API
     */
    app.route(cover);
};
