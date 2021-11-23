import { createReducer, on, Action } from '@ngrx/store';
import {
  AuthSignInActions,
  AuthSignUpActions,
  AuthenticatedActions,
} from '@auth/store/actions';

export interface SignInState {
  username: string | undefined;
  communicating: boolean;
  wrongUserNameOrPassword: boolean;
  newPasswordCommunicating: boolean;
  newPasswordCodeLimitExceeded: boolean;
  newPasswordCodeMismatch: boolean;
  newPasswordCodeUserNotFound: boolean;
  newPasswordErrorCode?: string;
  userNameIsJustVerified: boolean;
}

export const initialState: SignInState = {
  username: '',
  communicating: false,
  wrongUserNameOrPassword: false,
  newPasswordCommunicating: false,
  newPasswordCodeLimitExceeded: false,
  newPasswordCodeMismatch: false,
  newPasswordCodeUserNotFound: false,
  userNameIsJustVerified: false,
};

const signInReducer = createReducer(
  initialState,
  on(AuthSignInActions.authenticateUser, (state, { username }) => ({
    ...state,
    username,
    communicating: true,
    wrongUserNameOrPassword: false,
    userNameIsJustVerified: false,
  })),
  on(
    AuthSignInActions.authenticateUserAfterUserVerified,
    (state, { username }) => ({
      ...initialState,
      username,
      communicating: true,
      userNameIsJustVerified: true,
    })
  ),
  on(AuthSignInActions.confirmNewPassword, (state) => ({
    ...state,
    communicating: true,
    newPasswordCodeMismatch: false,
  })),
  on(AuthSignInActions.confirmNewPasswordSuccess, (state) => ({
    ...state,
    communicating: false,
  })),
  on(AuthSignInActions.confirmNewPasswordFailure, (state) => ({
    ...state,
    communicating: false,
    newPasswordCodeMismatch: false,
  })),
  on(AuthSignInActions.confirmNewPasswordFailureCodeMismatch, (state) => ({
    ...state,
    communicating: false,
    newPasswordCodeMismatch: true,
  })),
  on(AuthSignInActions.requestNewPasswordCode, (state, { username }) => ({
    ...state,
    username,
    communicating: true,
    newPasswordCodeLimitExceeded: false,
    newPasswordCodeUserNotFound: false,
  })),
  on(AuthSignInActions.requestNewPasswordCodeSuccess, (state) => ({
    ...state,
    communicating: false,
  })),
  on(AuthSignInActions.requestNewPasswordCodeFailure, (state) => ({
    ...state,
    communicating: false,
  })),
  on(AuthSignInActions.requestNewPasswordCodeFailureUserNotFound, (state) => ({
    ...state,
    communicating: false,
    newPasswordCodeUserNotFound: true,
  })),
  on(AuthSignInActions.requestNewPasswordCodeFailureLimitExceeded, (state) => ({
    ...state,
    communicating: false,
    newPasswordCodeLimitExceeded: true,
  })),
  on(
    AuthSignInActions.requestNewPasswordCodeFailureInvalidParameter,
    (state) => ({
      ...state,
      communicating: false,
    })
  ),
  on(AuthSignUpActions.redirectToSignUpVerification, (state, { username }) => ({
    ...initialState,
    communicating: false,
    username,
  })),
  on(AuthenticatedActions.userAuthenticatedSuccess, (state) => ({
    ...initialState,
    communicating: false,
  })),
  on(AuthSignInActions.authenticateUserFailureNotAuthorized, (state) => ({
    ...initialState,
    communicating: false,
    wrongUserNameOrPassword: true,
    userNameIsJustVerified: state.userNameIsJustVerified,
  })),
  on(AuthSignInActions.redirectToSignIn, (state, { username }) => ({
    ...initialState,
    username,
    wrongUserNameOrPassword: state.wrongUserNameOrPassword,
    userNameIsJustVerified: state.userNameIsJustVerified,
  }))
);

export const reducer = (state: SignInState | undefined, action: Action) =>
  signInReducer(state, action);
