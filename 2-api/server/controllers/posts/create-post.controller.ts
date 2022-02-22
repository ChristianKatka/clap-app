import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { dynamodbCreatePost } from '../../services/dynamodb/posts/dynamodb-create-post.service';
import { dynamodbGetUsersProfileImageById } from '../../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';
import { createNewLocationIfNotExistsAlready } from '../../utils/create-new-location-if-not-exist-already-util';

export const createPost = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;

  const post = {
    id: uuidv4(),
    userId,
    nickname,
    createdAt: Date.now(),
    postLocation: ctx.request.body.postLocation,
    ...ctx.request.body,
  };
  let PostApiResponse = post;

  await createNewLocationIfNotExistsAlready(post.postLocation);

  const creatorsProfileImage = await dynamodbGetUsersProfileImageById(userId);
  if (creatorsProfileImage) {
    PostApiResponse = {
      ...post,
      creatorsProfileImage: (creatorsProfileImage as any).imageUrl,
    };
  } else {
    PostApiResponse = {
      ...post,
      creatorsProfileImage: 'assets/images/default_profile_image.png',
    };
  }

  await dynamodbCreatePost(post);

  ctx.response.status = 200;
  ctx.response.body = PostApiResponse;

  await next();
};
