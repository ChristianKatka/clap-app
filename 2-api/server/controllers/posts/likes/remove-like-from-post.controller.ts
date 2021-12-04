import { Context, Next } from 'koa';
import { dynamodbRemovePostLike } from '../../../services/dynamodb/posts/likes/dynamodb-remove-post-like.service';

export const removeLikeFromPost = async (ctx: Context, next: Next) => {
  const { likeId } = ctx.params;

  await dynamodbRemovePostLike(likeId);

  ctx.response.status = 200;
  ctx.response.body = { likeId };

  await next();
};
