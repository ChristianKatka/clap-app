import { Context, Next } from 'koa';
import { dynamodbCreatePostLike } from '../../../services/dynamodb/posts/likes/dynamodb-create-post-like.service';
import { dynamodbGetUsersProfileImageById } from '../../../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

const fetchProfileImageToLikeCreator = async (like: any) => {
  const likersProfileImage = await dynamodbGetUsersProfileImageById(
    like.userId
  );
  if (likersProfileImage) {
    return {
      ...like,
      likersProfileImage: (likersProfileImage as any).imageUrl,
    };
  }
  return {
    ...like,
    likersProfileImage: 'assets/images/default_profile_image.png',
  };
};

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

  const likeWithLikersProfileImage = await fetchProfileImageToLikeCreator(like);

  ctx.response.status = 200;
  ctx.response.body = likeWithLikersProfileImage;

  await next();
};
