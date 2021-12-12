import { createAction, props } from '@ngrx/store';
import { PostLikeDraft } from '@shared/models/post-like.model';

export const resolvePendingPostLike = createAction(
  '[Pending] Resolve Pending Post Like',
  props<{ postLikeDraft: PostLikeDraft }>()
);

export const resolvePendingRemoveLikeFromPost = createAction(
  '[Pending] Resolve Remove Like From Post',
  props<{ likeId: string }>()
);

export const nothingToResolve = createAction('[Pending] Nothing To Resolve');
