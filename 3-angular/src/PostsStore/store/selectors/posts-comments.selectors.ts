import { createSelector } from '@ngrx/store';
import { getPostsCommentsState } from '../reducers';
import { sortByCreatedDate } from '@shared/helpers/sort-by-created-at-time';

export const getPostsComments = createSelector(getPostsCommentsState, (state) =>
  sortByCreatedDate(Object.values(state.postsComments))
);
