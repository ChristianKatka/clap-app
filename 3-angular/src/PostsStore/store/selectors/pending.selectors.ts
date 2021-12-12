import { createSelector } from '@ngrx/store';
import { getPendingPostLikesState } from '../reducers';

export const getPendingPostLikes = createSelector(
  getPendingPostLikesState,
  (state) => state.pendingPostLikes
);
export const getPendingRemovePostLikes = createSelector(
  getPendingPostLikesState,
  (state) => state.pendingRemovePostLikes
);
export const getLikesThatIhaveAlreadyGiven = createSelector(
  getPendingPostLikesState,
  (state) => Object.values(state.likesThatIhaveAlreadyGiven)
);
