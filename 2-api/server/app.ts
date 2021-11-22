import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { logRequestAndResponse } from './middlewares/request-response-logger.middleware';
import { imageRouter } from './routers/image.router';

const app = new Koa();

app.use(json());
app.use(bodyParser());
app.use(cors());

app.use(logRequestAndResponse);

// app.use(async ctx => {
//     ctx.body = 'Welcome to the server side';
//   });

app.use(imageRouter.routes()).use(imageRouter.allowedMethods());

export { app };
