import Router from 'koa-router';
import { deleteImage } from '../controllers/delete-image.controller';
import { getImages } from '../controllers/get-images.controller';
import { getSignedUrlForUploadingImage } from '../controllers/get-signed-url-for-uploading-image.controller';
import { storeUploadedImageInformation } from '../controllers/store-uploaded-image-information.controller';

const imageRouter = new Router();

imageRouter.get('/images', getImages);

imageRouter.post(
  '/get-signed-url-for-uploading-image',
  getSignedUrlForUploadingImage
);
imageRouter.post(
  '/store-uploaded-image-information',
  storeUploadedImageInformation
);
imageRouter.delete('/delete-image/:imageId', deleteImage);

export { imageRouter };
