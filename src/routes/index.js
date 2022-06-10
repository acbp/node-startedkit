import healthCheck from './healthcheck/index.js';

export default (app) => {
  healthCheck(app);

  console.debug('routes OK !');
};
