import { static as staticPage, Router } from 'express';

const page = Router();

page.get('/coverage', staticPage('coverage'));

console.debug('coverage     OK!');

export default page;
