import { createSelector } from '@ngrx/store';

import { getInitialUrlState } from '../reducers/index';

export const getInitialUrl = createSelector(
  getInitialUrlState,
  (state) => state.initialUrl
);
