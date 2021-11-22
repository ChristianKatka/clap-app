import { createAction, props } from '@ngrx/store';

export const getImages = createAction('[Images] Get Images');

export const getImagesSuccess = createAction(
  '[Images] Get Images Success',
  props<{imagesResponse: any[]}>()
);
export const getImagesFailure = createAction(
  '[Images] Get Images Failure',
  props<{ error: string }>()
);

export const setUploadingFile = createAction(
  '[Images] Set Uploading image',
  props<{ file: { name: string; mimeType: string } }>()
);

export const setUploadingFileProgress = createAction(
  '[Images] Set Uploading image progress',
  props<{ progress: number }>()
);

export const storeUploadedImageInformationToDB = createAction(
  '[Images] Store Uploaded Image Information To DB',
  props<{ name: string; mimeType: string }>()
);

export const storeUploadedImageInformationToDBSuccess = createAction(
  '[Images] Store Uploaded Image Information To DB Success',
  props<{
    image: {
      id: string;
      name: string;
      s3Key: string;
      mimeType: string;
      imageUrl: string;
    };
  }>()
);

export const storeUploadedImageInformationToDBFailure = createAction(
  '[Images] Store Uploaded Image Information To DB Failure',
  props<{ error: string }>()
);
