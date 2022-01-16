import { createSelector } from '@ngrx/store';
import { getCommentsUIState } from '../reducers';

// POST
export const getCommentUiStatus = createSelector(
  getCommentsUIState,
  (state) => state.commentUiStatus
);
