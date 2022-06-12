import App from './server';
import middleware from './middleware';
import routes from './routes';

const app = new App();

middleware(app);
routes(app);

app.listen();
