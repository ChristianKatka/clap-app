import { createSelector } from '@ngrx/store';
import { getPostsState } from '../reducers';

export const getPosts = createSelector(getPostsState, (state) =>
  Object.values(state.entities)
);

export const isLoading = createSelector(
  getPostsState,
  (state) => state.loading
);
