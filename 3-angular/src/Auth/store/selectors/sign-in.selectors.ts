import { createSelector } from '@ngrx/store';

import { getSignInState } from '../reducers/index';

export const getIsSignInCommunicating = createSelector(
  getSignInState,
  (state) => state.communicating
);

export const getSignInUserName = createSelector(
  getSignInState,
  (state) => state.username
);

export const getIsWrongUserNameOrPassword = createSelector(
  getSignInState,
  (state) => state.wrongUserNameOrPassword
);

export const getIsNewPasswordCommunicating = createSelector(
  getSignInState,
  (state) => state.newPasswordCommunicating
);

export const getIsNewPasswordCodeMismatch = createSelector(
  getSignInState,
  (state) => state.newPasswordCodeMismatch
);

export const getIsNewPasswordCodeLimitExceeded = createSelector(
  getSignInState,
  (state) => state.newPasswordCodeLimitExceeded
);

export const getIsNewPasswordCodeUserNotFound = createSelector(
  getSignInState,
  (state) => state.newPasswordCodeUserNotFound
);

export const getIsUserNameJustVerified = createSelector(
  getSignInState,
  (state) => state.userNameIsJustVerified
);

export const getNewPasswordErrorCode = createSelector(
  getSignInState,
  (state) => state.newPasswordErrorCode
);
