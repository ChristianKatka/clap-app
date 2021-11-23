import { createSelector } from '@ngrx/store';

import { getSignUpState } from '../reducers';

export const getIsSignUpCommunicating = createSelector(
  getSignUpState,
  (state) => state.communicating
);

export const getSignUpUsername = createSelector(
  getSignUpState,
  (state) => state.username
);

export const getSignUpUserNameAndPassword = createSelector(
  getSignUpState,
  (state) => ({
    username: state.username,
    password: state.password,
  })
);

export const getSignUpUserNameExists = createSelector(
  getSignUpState,
  (state) => state.userNameExists
);

export const getSignUpPasswordRequirements = createSelector(
  getSignUpState,
  (state) => state.passwordRequirements
);

export const getSignUpVerificationCodeMismatch = createSelector(
  getSignUpState,
  (state) => state.verificationCodeMismatch
);

export const getIsNewVerificationCodeSent = createSelector(
  getSignUpState,
  (state) => state.newVerificationCodeSent
);

export const getIsNewVerificationCodeLimitExceeded = createSelector(
  getSignUpState,
  (state) => state.newVerificationCodeLimitExceeded
);

export const getIsNewPasswordCodeFailedBecauseEmailNotVerified = createSelector(
  getSignUpState,
  (state) => state.newPasswordCodeFailedBecauseEmailNotVerified
);

export const getSignUpUserName = createSelector(
  getSignUpUserNameAndPassword,
  ({ username, password }) => username
);

export const getIsInvalidParameter = createSelector(
  getSignUpState,
  (state) => state.invalidParameter
);
