import { createAction, props } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';

export const giveLikeToPostWithoutId = createAction(
  '[Posts] Give Like To Post Without Id',
  props<{ postId: string }>()
);

export const giveLikeToPost = createAction(
  '[Posts] Give Like To Post',
  props<{ postLikeDraft: PostLikeDraft }>()
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
  props<{ like: PostLike | PostLikeDraft }>()
);
export const removeLikeFromPostSuccess = createAction(
  '[Posts] Remove Like From Post Success',
  props<{ likeId: string }>()
);
export const removeLikeFromPostFailure = createAction(
  '[Posts] Remove Like From Post Failure',
  props<{ error: string }>()
);

export const newLikeHappenedViaSocket = createAction(
  '[Posts] New Like Happened Via Socket',
  props<{ like: PostLike }>()
);