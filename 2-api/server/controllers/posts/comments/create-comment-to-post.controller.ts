import { Context, Next } from 'koa';
import { dynamodbCreatePostComment } from '../../../services/dynamodb/posts/comments/dynamodb-create-post-comment.service';

export const createCommentToPost = async (ctx: Context, next: Next) => {
  const id = ctx.params.commentId;
  const postId = ctx.params.postId;
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;

  const text = ctx.request.body.text;
  const likersProfileImage = ctx.request.body.likersProfileImage;

  const comment = {
    id,
    postId,
    userId,
    nickname,
    text,
    createdAt: Date.now(),
  };

  await dynamodbCreatePostComment(comment);

  ctx.response.status = 200;
  ctx.response.body = {...comment, likersProfileImage};

  await next();
};
