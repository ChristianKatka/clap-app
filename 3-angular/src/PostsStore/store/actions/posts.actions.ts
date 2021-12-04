import { createAction, props } from '@ngrx/store';
import { PostLike } from '@shared/models/post-like.model';
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

export const giveLikeToPost = createAction(
  '[Posts] Give Like To Post',
  props<{ postId: string }>()
);
export const giveLikeToPostSuccess = createAction(
  '[Posts] Give Like To Post Success',
  props<{ like: PostLike }>()
);
export const giveLikeToPostFailure = createAction(
  '[Posts] Give Like To Post Failure',
  props<{ error: string }>()
);

export const removeLikeFromPost = createAction(
  '[Posts] Remove Like From Post',
  props<{ likeId: string }>()
);
export const removeLikeFromPostSuccess = createAction(
  '[Posts] Remove Like From Post Success',
  props<{ likeId: string }>()
);
export const removeLikeFromPostFailure = createAction(
  '[Posts] Remove Like From Post Failure',
  props<{ error: string }>()
);
