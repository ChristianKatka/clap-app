import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import { decodeCognitoToken } from './middlewares/cognito-token.middleware';
import { logRequestAndResponse } from './middlewares/request-response-logger.middleware';
import { initializeRouter } from './routers/initialize.router';
import { postsRouter } from './routers/posts.router';
import { userRouter } from './routers/user.router';
import { websocketRouter } from './routers/websocket.router';

const app = new Koa();

app.use(json());
app.use(bodyParser());
app.use(cors());
app.use(logRequestAndResponse);
app.use(decodeCognitoToken);

// app.use(async ctx => {
//     ctx.body = 'Welcome to the server side';
//   });

app.use(initializeRouter.routes()).use(initializeRouter.allowedMethods());
app.use(postsRouter.routes()).use(postsRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(websocketRouter.routes()).use(websocketRouter.allowedMethods());

export { app };
