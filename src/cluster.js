/* istanbul ignore file */
const cluster = require('cluster');

module.exports = async ({ config, server }) => {
  /* istanbul ignore file */
  if (cluster.isWorker) {
    process.on('SIGHUP', () => {
      console.timeEnd(`worker-${process.pid}`);
      console.debug('exit');
      process.kill('SIGTERM');
    });
  }

  /* istanbul ignore for,next,else,if */
  const numCPUs = config?.CPU || 1;
  console.time(`worker-${process.pid}`);
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

    return;
  }

  console.debug(`Worker ${process.pid} started`);
  server();
  process.on('SIGHUP', () => {
    console.debug('exit');
    console.timeEnd(`worker-${process.pid}`);
    const array = Object.values(cluster.workers);
    for (let index = 0; index < array.length; index++) {
      const worker = array[index];
      worker.process.kill('SIGTERM');
    }
  });
};
