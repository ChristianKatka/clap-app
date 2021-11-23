import { createSelector } from '@ngrx/store';

import { getAuthenticatedState } from '../reducers/index';

export const isCheckingOldUserSession = createSelector(
  getAuthenticatedState,
  (state) => state.checkingOldUserSession
);

export const isAuthenticating = createSelector(
  getAuthenticatedState,
  (state) => state.authenticating
);

export const isAuthenticated = createSelector(
  getAuthenticatedState,
  (state) => state.authenticated
);
