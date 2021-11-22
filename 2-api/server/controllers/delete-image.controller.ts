import { Context, Next } from 'koa';
import { dynamodbDeleteImage } from '../services/dynamodb/dynamodb-delete-image.service';

export const deleteImage = async (ctx: Context, next: Next) => {
  const { imageId } = ctx.params;
  
  await dynamodbDeleteImage(imageId);

  ctx.response.status = 200;
  ctx.response.body = {
    id: imageId,
  };

  await next();
};
