import { Context, Next } from 'koa';
import { dynamodbCreatePostLike } from '../../../services/dynamodb/posts/likes/dynamodb-create-post-like.service';

export const giveLikeToPost = async (ctx: Context, next: Next) => {
  const id = ctx.params.likeId;
  const postId = ctx.params.postId;
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;

  const like = {
    id,
    postId,
    userId,
    nickname,
    createdAt: Date.now(),
  };

  await dynamodbCreatePostLike(like);

  ctx.response.status = 200;
  ctx.response.body = like;

  await next();
};
