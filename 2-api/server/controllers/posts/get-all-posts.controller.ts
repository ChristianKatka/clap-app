import { Context, Next } from 'koa';
import { dynamodbGetAllPosts } from '../../services/dynamodb/dynamodb-get-all-posts.service';

export const getAllPosts = async (ctx: Context, next: Next) => {
  const posts = await dynamodbGetAllPosts();

  ctx.response.status = 200;
  ctx.response.body = posts;

  await next();
};
