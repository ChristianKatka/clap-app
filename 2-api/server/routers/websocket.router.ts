import Router from 'koa-router';
import { connectWebSocket } from '../controllers/websockets/connect-websocket.controller';

const prefix = '/websocket';
const websocketRouter = new Router({ prefix });

websocketRouter.post('/session', connectWebSocket);

export { websocketRouter };
