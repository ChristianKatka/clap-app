import { createSelector } from '@ngrx/store';

import { getRouterState } from '../reducers';

export const getRouterCurrentState = createSelector(getRouterState, (state) =>
  state ? state.state : undefined
);

export const getRouterCurrentUrl = createSelector(
  getRouterCurrentState,
  (state) => (state ? state.url : undefined)
);
