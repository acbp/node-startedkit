const healthCheck = require('./healthcheck/index.js');

module.exports = (app) => {
  healthCheck(app);

  console.debug('routes OK !');
};
