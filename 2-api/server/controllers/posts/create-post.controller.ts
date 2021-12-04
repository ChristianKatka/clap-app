import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { dynamodbCreatePost } from '../../services/dynamodb/posts/dynamodb-create-post.service';

export const createPost = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;

  const post = {
    id: uuidv4(),
    userId,
    nickname,
    createdAt: Date.now(),
    ...ctx.request.body,
  };

  await dynamodbCreatePost(post);

  ctx.response.status = 200;
  ctx.response.body = post;

  await next();
};
