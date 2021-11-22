import { Context, Next } from 'koa';
import { dynamodbDeleteImage } from '../services/dynamodb/dynamodb-delete-image.service';
import { dynamodbGetImages } from '../services/dynamodb/dynamodb-get-images.service';

export const getImages = async (ctx: Context, next: Next) => {

  const images = await dynamodbGetImages();

  ctx.response.status = 200;
  ctx.response.body = images;

  await next();
};
