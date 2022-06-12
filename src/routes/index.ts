import {json}from 'express';

import apm from './apm';
import doc from './doc';
import health from './healthcheck';
import coverage from './coverage';

export default ( app: any) => {
    app.routes(json());

    /**
     * @apiGroup Services
     * @apiName Monitor
     *
     * @api {get} /status Monitor
     * @apiDescription Monitora os recuros do servidor
     */
    app.routes(apm);

    /**
     * @apiGroup Services
     * @apiName Documentação
     *
     * @api {get} / Documentação da API
     * @apiDescription Exibe documentação da API
     */
    app.routes(doc);


    /**
     * @apiGroup Services
     * @apiName Saúde
     *
     * @api {get} /health Validação de saúde do servidor.
     * @apiDescription Exibe se o servidor está rodando
     */
    app.routes(health);

    /**
     * @apiGroup Services
     * @apiName Cobertura de código
     *
     * @api {get} /coverage Cobertura de código da API
     * @apiDescription Exibe cobertura de código da API
     */
    app.routes(coverage);
};
