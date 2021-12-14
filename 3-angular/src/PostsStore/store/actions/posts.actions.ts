import { createAction, props } from '@ngrx/store';
import {
  PostWithImage,
  PostWithImageDraft,
} from '@shared/models/post-with-image.model';
import {
  PostWithoutImage,
  PostWithoutImageDraft,
} from '@shared/models/post-without-image.model';

export const createPostWithImage = createAction(
  '[Posts] Create Post With Image',
  props<{ postDraft: PostWithImageDraft }>()
);
export const createPostWithImageSuccess = createAction(
  '[Posts] Create Post With Image Success',
  props<{ post: PostWithImage }>()
);
export const createPostWithImageFailure = createAction(
  '[Posts] Create Post With Image Failure',
  props<{ error: string }>()
);

export const createPostWithoutImage = createAction(
  '[Posts] Create Post Without Image',
  props<{ postDraft: PostWithoutImageDraft }>()
);
export const createPostWithoutImageSuccess = createAction(
  '[Posts] Create Post Without Image Success',
  props<{ post: PostWithoutImage }>()
);
export const createPostWithoutImageFailure = createAction(
  '[Posts] Create Post Without Image Failure',
  props<{ error: string }>()
);

export const selectPost = createAction(
  '[Posts] Select Post',
  props<{ postId: string }>()
);
export const clearPostSelection = createAction('[Posts] Clear Post Selection');
