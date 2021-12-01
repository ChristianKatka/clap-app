import { createReducer, on, Action } from '@ngrx/store';
import {
  AuthSignInActions,
  AuthSignUpActions,
  AuthenticatedActions,
} from '@auth/store/actions';

export interface SignInState {
  username: string | undefined;
  loading: boolean;
  wrongUserNameOrPassword: boolean;
}

export const initialState: SignInState = {
  username: '',
  loading: false,
  wrongUserNameOrPassword: false,
};

const signInReducer = createReducer(
  initialState,

  // CHECKED
  on(AuthSignInActions.authenticateUser, (state, { signInData }) => ({
    ...state,
    username: signInData.username,
    loading: true,
  })),
  on(AuthenticatedActions.authenticateUserSuccess, (state) => ({
    ...state,
    loading: false,
    wrongUserNameOrPassword: false,
  })),
  on(AuthSignInActions.authenticateUserFailureNotAuthorized, (state) => ({
    ...state,
    loading: false,
    wrongUserNameOrPassword: true,
  })),
  on(AuthSignUpActions.redirectToEmailConfirmationView, (state, { username }) => ({
    ...state,
    username,
    loading: false,
  })),

  // -----


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



  
  // on(AuthSignInActions.requestNewPasswordCode, (state, { username }) => ({
  //   ...state,
  //   username,
  //   communicating: true,
  //   newPasswordCodeLimitExceeded: false,
  //   newPasswordCodeUserNotFound: false,
  // })),
  // on(AuthSignInActions.requestNewPasswordCodeSuccess, (state) => ({
  //   ...state,
  //   communicating: false,
  // })),
  // on(AuthSignInActions.requestNewPasswordCodeFailure, (state) => ({
  //   ...state,
  //   communicating: false,
  // })),
  // on(AuthSignInActions.requestNewPasswordCodeFailureUserNotFound, (state) => ({
  //   ...state,
  //   communicating: false,
  //   newPasswordCodeUserNotFound: true,
  // })),
  // on(AuthSignInActions.requestNewPasswordCodeFailureLimitExceeded, (state) => ({
  //   ...state,
  //   communicating: false,
  //   newPasswordCodeLimitExceeded: true,
  // })),
  // on(
  //   AuthSignInActions.requestNewPasswordCodeFailureInvalidParameter,
  //   (state) => ({
  //     ...state,
  //     communicating: false,
  //   })
  // )

  // on(AuthSignInActions.redirectToSignIn, (state, { username }) => ({
  //   ...initialState,
  //   username,
  //   wrongUserNameOrPassword: state.wrongUserNameOrPassword,
  //   userNameIsJustVerified: state.userNameIsJustVerified,
  // }))
);

export const reducer = (state: SignInState | undefined, action: Action) =>
  signInReducer(state, action);
