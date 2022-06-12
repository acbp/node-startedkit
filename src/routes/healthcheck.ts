import { Router } from 'express';

const page = Router();

/**
 * @apiGroup Services
 * @apiName Health Check
 *
 * @api {get} /healthcheck Health Check
 * @apiDescription Valida se servidor está rodando.
 * @apiSuccess {String} status Confirmação que o serviço está rodando
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
const healthCheck = (request: any, response: any) => {
  request;
  console.debug('health-check OK !');
  response.status(200).send('');
};


page.get('/ping', healthCheck);
page.get('/check', healthCheck);
page.get('/health', healthCheck);
page.get('/healthcheck', healthCheck);
page.get('/health-check', healthCheck);

console.debug('health-check OK!');

export default page;
