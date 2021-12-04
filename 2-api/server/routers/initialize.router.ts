import Router from 'koa-router';
import { getAppInitializeData } from '../controllers/initialize/get-app-initialize-data.controller';
const initializeRouter = new Router({ prefix: '/initialize' });

initializeRouter.get('/', getAppInitializeData);

export { initializeRouter };
