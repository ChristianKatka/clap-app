import { createSelector } from '@ngrx/store';
import { getPostsCommentsState } from '../reducers';

export const getPostsComments = createSelector(getPostsCommentsState, (state) =>
  Object.values(state.postsComments)
);
