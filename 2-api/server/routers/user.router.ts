import Router from 'koa-router';
import { getSignedUrlForUploadingProfileImage } from '../controllers/user/profile-image/get-signed-url-for-uploading-profile-image.controller';
import { storeUploadedProfileImageInformation } from '../controllers/user/profile-image/store-uploaded-profile-image-information.controller';
import { updateUserBio } from '../controllers/user/update-user-bio.controller';

const userRouter = new Router({ prefix: '/user' });

userRouter.put('/bio', updateUserBio);

userRouter.post(
  '/image/get-signed-url-for-uploading-profile-image',
  getSignedUrlForUploadingProfileImage
);
userRouter.post(
  '/image/store-uploaded-profile-image-information',
  storeUploadedProfileImageInformation
);

export { userRouter };
