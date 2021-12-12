import { createAction, props } from '@ngrx/store';
import { ProfileImage } from '@shared/models/profile-image.models';

export const setUploadingProfileImage = createAction(
  '[ProfileImage] Set Uploading Profile Image',
  props<{ file: { name: string; mimeType: string } }>()
);

export const setUploadingProfileImageProgress = createAction(
  '[ProfileImage] Set Uploading image progress',
  props<{ progress: number }>()
);

export const storeUploadedProfileImageInformationToDB = createAction(
  '[ProfileImage] Store Uploaded Profile Image Information To DB',
  props<{ name: string; mimeType: string; s3Key: string }>()
);

export const storeUploadedProfileImageInformationToDBSuccess = createAction(
  '[ProfileImage] Store Uploaded Profile Image Information To DB Success',
  props<{
    image: ProfileImage;
  }>()
);

export const storeUploadedProfileImageInformationToDBFailure = createAction(
  '[ProfileImage] Store Uploaded Profile Image Information To DB Failure',
  props<{ error: string }>()
);
