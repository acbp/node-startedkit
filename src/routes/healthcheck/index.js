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
const healthCheck = (request, response) => {
  console.debug('health-check OK !');
  response.status(200).send('OK');
};
export default (app) => {
  app.get('/healthcheck', healthCheck);
  app.get('/health-check', healthCheck);
};
