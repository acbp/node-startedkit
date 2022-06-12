import { static as staticPage, Router } from 'express';

const page = Router();

page.get('/', staticPage('doc'));
page.get('/doc', staticPage('doc'));

console.debug('docs         OK!');

export default page;
