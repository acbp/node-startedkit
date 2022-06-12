import apm from 'express-status-monitor'; // https://github.com/RafalWilinski/express-status-monitor

// Monitor da aplicação
const apmConfig:any = {
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
      path: '/healthcheck',
    },
    {
      protocol: 'http',
      path: '/coverage',
    },
    {
      protocol: 'http',
      path: '/',
    },
  ],
};

console.debug('APM    OK !');
export default apm(apmConfig);
