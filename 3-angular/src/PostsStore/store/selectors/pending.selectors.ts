import { createSelector } from '@ngrx/store';
import { getPendingPostLikesState, getPendingCommentLikesState } from '../reducers';

// POST
export const getPendingPostLikes = createSelector(
  getPendingPostLikesState,
  (state) => state.pendingPostLikes
);
export const getPendingRemovePostLikes = createSelector(
  getPendingPostLikesState,
  (state) => state.pendingRemovePostLikes
);
export const getPostLikesThatIhaveAlreadyGiven = createSelector(
  getPendingPostLikesState,
  (state) => Object.values(state.likesThatIhaveAlreadyGiven)
);


// comment
export const getPendingCommentLikes = createSelector(
  getPendingCommentLikesState,
  (state) => state.pendingCommentLikes
);
export const getPendingRemoveCommentLikes = createSelector(
  getPendingCommentLikesState,
  (state) => state.pendingRemoveCommentLikes
);
export const getCommentLikesThatIhaveAlreadyGiven = createSelector(
  getPendingCommentLikesState,
  (state) => Object.values(state.likesThatIhaveAlreadyGiven)
);
