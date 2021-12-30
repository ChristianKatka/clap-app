import { createSelector } from '@ngrx/store';
import { getPostsCommentsState } from '../reducers';

export const getPostsComments = createSelector(getPostsCommentsState, (state) =>
  Object.values(state.postsComments)
);

export const getNewPostCommentsViaSocket = createSelector(
  getPostsCommentsState,
  (state) => Object.values(state.newPostCommentViaSocket)
);
