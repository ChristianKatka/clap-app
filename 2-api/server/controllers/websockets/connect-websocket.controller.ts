import { Context, Next } from 'koa';
import { dynamodbConnectWebSocket } from '../../services/dynamodb/socket/dynamodb-connect-websocket.service';

export const connectWebSocket = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  const { sessionKey } = ctx.request.body;

  const item = {
    userId,
    sessionKey,
  };

  await dynamodbConnectWebSocket(item);

  ctx.status = 200;
  ctx.body = item;

  await next();
};
