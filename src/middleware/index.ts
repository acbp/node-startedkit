/* istanbul ignore file */
// importando dependencias do projeto

import cors from './cors';
import helmet from './helmet';

/** 
 * apiName
 * @apiDescription Monitora os recuros do servidor
 */
export default (app: App): void => {
    app.middleware(cors);
    app.middleware(helmet);
};
