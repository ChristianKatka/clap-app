import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { CLOUDFRONT_URL } from '../../../constants';
import { dynamodbStoreUploadedProfileImageInformation } from '../../../services/dynamodb/users/profile-image/dynamodb-store-uploaded-profile-image-information.service';


export const storeUploadedProfileImageInformation = async (
  ctx: Context,
  next: Next
) => {
  // image/jpeg  avatar.jpg
  const { name, mimeType } = ctx.request.body;

  const imageInfo = {
    id: uuidv4(),
    name,
    s3Key: name,
    mimeType,
    imageUrl: `${CLOUDFRONT_URL}${name}`
  };

  await dynamodbStoreUploadedProfileImageInformation(imageInfo);

  ctx.response.status = 200;
  ctx.response.body = imageInfo;

  await next();
};
