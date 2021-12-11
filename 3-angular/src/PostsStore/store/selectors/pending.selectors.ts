import { createSelector } from '@ngrx/store';
import { getPendingState } from '../reducers';

export const getPendingPostLikes = createSelector(
  getPendingState,
  (state) => state.pendingPostLikes
);
export const getPendingRemovePostLikes = createSelector(
  getPendingState,
  (state) => state.pendingRemovePostLikes
);
export const getLikesThatIhaveAlreadyGiven = createSelector(getPendingState, (state) =>
  Object.values(state.likesThatIhaveAlreadyGiven)
);
