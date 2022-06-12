import App from './app';

const app = new App();

middleware(app);
routes(app);

app.listen();
