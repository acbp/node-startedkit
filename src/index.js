/* istanbul ignore file */
// importando dependencias do projeto
const { app, server } = require('./server.js');
require('./cluster.js')({
  app,
  server,
});
