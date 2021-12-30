import { createAction, props } from '@ngrx/store';
import { CommentLikeDraft } from '@shared/models/comment-like.model';

export const resolvePendingCommentLike = createAction(
  '[Pending] Resolve Pending Comment Like',
  props<{ commentLikeDraft: CommentLikeDraft }>()
);

export const resolvePendingRemoveLikeFromComment = createAction(
  '[Pending] Resolve Remove Like From Comment',
  props<{ likeId: string }>()
);

export const nothingToResolve = createAction('[Pending] Nothing To Resolve');
