import cors from 'cors'; // cross origin resource share - https://github.com/expressjs/cors

/* https://github.com/expressjs/cors#configuration-options */
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  maxAge: 30 * 1 * 24 * 60 * 60 * 1000, // 1 dia
};

export default (cors(corsOptions));
