import { createSelector } from '@ngrx/store';
import { getPostsUiState } from '../reducers';

export const isAddCommentClicked = createSelector(
  getPostsUiState,
  (state) => state.clickedAddComment
);
