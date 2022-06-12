import { static as staticPage, Router } from 'express';

const page = Router();

page.get('/', staticPage('doc'));
page.get('/doc', staticPage('doc'));

console.debug('doc   OK!');

export default page;
