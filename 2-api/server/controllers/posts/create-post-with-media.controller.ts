import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { CLOUDFRONT_URL } from '../../constants';
import { dynamodbCreatePost } from '../../services/dynamodb/posts/dynamodb-create-post.service';
import { dynamodbStorePostMedia } from '../../services/dynamodb/posts/media/dynamodb-store-post-media.service';
import { attachProfileImageToPost } from '../../utils/attach-profile-image-to-post.util';
import { createNewLocationIfNotExistsAlready } from '../../utils/create-new-location-if-not-exist-already-util';

export const createPostWithMedia = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  const nickname = ctx.state.jwtPayload.nickname;
  const { id, text, mimeType, s3Key, postLocation } = ctx.request.body;

  const post = {
    id,
    userId,
    nickname,
    text,
    postLocation,
    createdAt: Date.now(),
  };
  const postMedia = {
    id: uuidv4(),
    postId: id,
    mimeType,
    s3Key,
    mediaUrl: `${CLOUDFRONT_URL}${s3Key}`,
  };

  await createNewLocationIfNotExistsAlready(postLocation);
  await dynamodbCreatePost(post);
  await dynamodbStorePostMedia(postMedia);

  const postWithProfileImage = await attachProfileImageToPost(post);

  const PostApiResponse = {
    ...postWithProfileImage,
    mimeType,
    s3Key,
    mediaUrl: postMedia.mediaUrl,
  };

  ctx.response.status = 200;
  ctx.response.body = PostApiResponse;

  await next();
};
