import { createAction, props } from '@ngrx/store';
import {
  PostWithMediaApiRes,
  PostWithMediaImageUploaded,
} from '@shared/models/post-with-media.model';
import { PostDraft, PostApiResponse } from '@shared/models/post.model';

export const createPost = createAction(
  '[Posts] Create Post',
  props<{ postDraftToDb: PostDraft }>()
);
export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{ PostApiResponse: PostApiResponse | PostWithMediaApiRes }>()
);
export const createPostFailure = createAction(
  '[Posts] Create Post Failure',
  props<{ error: string }>()
);

export const selectPost = createAction(
  '[Posts] Select Post',
  props<{ postId: string }>()
);
export const clearPostSelection = createAction('[Posts] Clear Post Selection');

// POST WITH IMAGE
export const setupCreatingPostWithImage = createAction(
  '[Posts] Setup Creating Post With Image'
);
export const setPostImageUploadProgressAmount = createAction(
  '[Posts] Set Post Image Upload Progress Amount',
  props<{ imageUploadProgressAmount: number }>()
);

export const createPostWithMedia = createAction(
  '[Posts] Create Post With Media',
  props<{ postWithMediaDraft: PostWithMediaImageUploaded }>()
);

// export const storeUploadedPostImageInformationToDB = createAction(
//   '[Posts] store Uploaded Post Image Information To DB',
//   props<{
//     postImageDataDraft: {
//       imageName: string;
//       mimeType: string;
//       s3Key: string;
//       postId: string;
//     };
//   }>()
// );
// export const storeUploadedPostImageInformationToDBSuccess = createAction(
//   '[Posts] store Uploaded Post Image Information To DB Success',
//   props<{
//     postImageData: {
//       id: string;
//       postId: string;
//       imageName: string;
//       s3Key: string;
//       mimeType: string;
//       imageUrl: string;
//       createdAt: string;
//     };
//   }>()
// );
// export const storeUploadedPostImageInformationToDBFailure = createAction(
//   '[Posts] store Uploaded Post Image Information To DB Failure',
//   props<{
//     error: string;
//   }>()
// );
