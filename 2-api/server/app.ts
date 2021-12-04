import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { logRequestAndResponse } from './middlewares/request-response-logger.middleware';
import { decodeCognitoToken } from './middlewares/cognito-token.middleware';
import { postsRouter } from './routers/posts.router';
import { initializeRouter } from './routers/initialize.router';

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

export { app };
