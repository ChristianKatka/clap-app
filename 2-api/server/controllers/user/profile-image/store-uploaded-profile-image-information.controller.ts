import { Context, Next } from 'koa';
import { CLOUDFRONT_URL } from '../../../constants';
import { dynamodbStoreUploadedProfileImageInformation } from '../../../services/dynamodb/users/profile-image/dynamodb-store-uploaded-profile-image-information.service';


export const storeUploadedProfileImageInformation = async (
  ctx: Context,
  next: Next
) => {
  // image/jpeg
  const { name, mimeType, s3Key } = ctx.request.body;

  const imageInfo = {
    id: s3Key,
    name,
    s3Key,
    mimeType,
    imageUrl: `${CLOUDFRONT_URL}${s3Key}`
  };

  await dynamodbStoreUploadedProfileImageInformation(imageInfo);

  ctx.response.status = 200;
  ctx.response.body = imageInfo;

  await next();
};
