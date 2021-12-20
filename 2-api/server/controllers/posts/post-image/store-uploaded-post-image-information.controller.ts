import { Context, Next } from 'koa';
import { CLOUDFRONT_URL } from '../../../constants';
import { dynamodbStoreUploadedPostImageInformation } from '../../../services/dynamodb/posts/dynamodb-store-uploaded-post-image-information.service';

export const storeUploadedPostImageInformation = async (
  ctx: Context,
  next: Next
) => {

  // image/jpeg
  const { imageName, mimeType, s3Key, postId } = ctx.request.body;

  const imageInfo = {
    id: s3Key,
    postId,
    imageName,
    s3Key,
    mimeType,
    imageUrl: `${CLOUDFRONT_URL}${s3Key}`,
    createdAt: Date.now(),
  };

  await dynamodbStoreUploadedPostImageInformation(imageInfo);

  ctx.response.status = 200;
  ctx.response.body = imageInfo;

  await next();
};
