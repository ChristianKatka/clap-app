import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { dynamodbCreatePostLike } from '../../../services/dynamodb/posts/likes/dynamodb-create-post-like.service';

export const giveLikeToPost = async (ctx: Context, next: Next) => {
  const postId = ctx.params.postId;
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;

  const like = {
    id: uuidv4(),
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
