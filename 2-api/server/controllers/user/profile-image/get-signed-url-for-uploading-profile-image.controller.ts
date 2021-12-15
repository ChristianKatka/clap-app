import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { S3_IMAGES_BUCKET } from '../../../constants';
import { s3GetImageSignedUploadUrl } from '../../../services/s3/s3-get-image-signed-upload-url.service';

export const getSignedUrlForUploadingProfileImage = async (
  ctx: Context,
  next: Next
) => {
  // image/jpeg  avatar.jpg
  const { name, mimeType } = ctx.request.body;
  const id = uuidv4();
  const s3Key = `profile-images/${id}-${name}`;

  const uploadUrl = s3GetImageSignedUploadUrl(
    s3Key,
    mimeType,
    S3_IMAGES_BUCKET
  );

  ctx.response.status = 200;
  ctx.response.body = {
    name,
    uploadUrl,
    s3Key,
    mimeType,
  };

  await next();
};
