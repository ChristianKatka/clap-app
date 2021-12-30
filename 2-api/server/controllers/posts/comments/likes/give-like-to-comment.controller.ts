import { Context, Next } from 'koa';
import { dynamodbCreateCommentLike } from '../../../../services/dynamodb/posts/comments/likes/dynamodb-create-comment-like.service';

export const giveLikeToComment = async (ctx: Context, next: Next) => {
  const id = ctx.params.likeId;
  const commentId = ctx.params.commentId;
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;

  const like = {
    id,
    commentId,
    userId,
    nickname,
    createdAt: Date.now(),
  };

  await dynamodbCreateCommentLike(like);

  ctx.response.status = 200;
  ctx.response.body = like;

  await next();
};
