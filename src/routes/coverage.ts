import { static as staticPage, Router } from 'express';

const route = Router();

route.get('/coverage', staticPage('coverage'));

console.debug('coverage OK !');

export default route;
