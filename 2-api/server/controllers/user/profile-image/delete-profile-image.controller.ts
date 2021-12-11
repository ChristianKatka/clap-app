import { Context, Next } from 'koa';
import { dynamodbDeleteProfileImage } from '../../../services/dynamodb/users/profile-image/dynamodb-delete-profile-image.service';

export const deleteImage = async (ctx: Context, next: Next) => {
  const { imageId } = ctx.params;
  
  await dynamodbDeleteProfileImage(imageId);

  ctx.response.status = 200;
  ctx.response.body = {
    id: imageId,
  };

  await next();
};
