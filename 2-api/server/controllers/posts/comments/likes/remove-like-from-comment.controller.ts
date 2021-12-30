import { Context, Next } from 'koa';
import { dynamodbRemoveCommentLike } from '../../../../services/dynamodb/posts/comments/likes/dynamodb-remove-comment-like.service';

export const removeLikeFromComment = async (ctx: Context, next: Next) => {
  const { likeId } = ctx.params;

  await dynamodbRemoveCommentLike(likeId);

  ctx.response.status = 200;
  ctx.response.body = { likeId };

  await next();
};
