import { createAction, props } from '@ngrx/store';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';

export const giveLikeToCommentWithoutId = createAction(
  '[Comments] Give Like To Comment Without Id',
  props<{ commentId: string }>()
);

export const giveLikeToComment = createAction(
  '[Comments] Give Like To Comment',
  props<{ commentLikeDraft: CommentLikeDraft }>()
);
export const giveLikeToCommentSuccess = createAction(
  '[Comments] Give Like To Comment Success',
  props<{ like: CommentLike }>()
);
export const giveLikeToCommentFailure = createAction(
  '[Comments] Give Like To Comment Failure',
  props<{ error: string }>()
);

export const removeLikeFromComment = createAction(
  '[Comments] Remove Like From Comment',
  props<{ like: CommentLike | CommentLikeDraft }>()
);
export const removeLikeFromCommentSuccess = createAction(
  '[Comments] Remove Like From Comment Success',
  props<{ likeId: string }>()
);
export const removeLikeFromCommentFailure = createAction(
  '[Comments] Remove Like From Comment Failure',
  props<{ error: string }>()
);
