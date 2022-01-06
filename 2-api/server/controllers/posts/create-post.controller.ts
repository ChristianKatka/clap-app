import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { dynamodbCreatePost } from '../../services/dynamodb/posts/dynamodb-create-post.service';
import { dynamodbGetUsersProfileImageById } from '../../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

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
  let PostApiResponse = post;

  //  WONT WRITE profile image to posts table because it can change
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
