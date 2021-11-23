import { createReducer, on, Action } from '@ngrx/store';
import { AuthSignInActions, AuthSignUpActions } from '@auth/store/actions';

export interface SignUpState {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  communicating: boolean;
  userNameExists: boolean;
  invalidParameter: boolean;
  passwordRequirements: boolean;
  newVerificationCodeSent: boolean;
  newVerificationCodeLimitExceeded: boolean;
  newPasswordCodeFailedBecauseEmailNotVerified: boolean;
  verificationCodeMismatch: boolean;
}

export const initialState: SignUpState = {
  username: undefined,
  password: undefined,
  email: undefined,
  communicating: false,
  userNameExists: false,
  invalidParameter: false,
  passwordRequirements: false,
  newVerificationCodeSent: false,
  newVerificationCodeLimitExceeded: false,
  newPasswordCodeFailedBecauseEmailNotVerified: false,
  verificationCodeMismatch: false,
};

const signUpReducer = createReducer(
  initialState,
  on(AuthSignUpActions.signUp, (state, { username, password, email }) => ({
    ...initialState,
    communicating: true,
    userNameExists: false,
    invalidParameter: false,
    passwordRequirements: false,
    username,
    password,
    email,
  })),
  on(AuthSignUpActions.signUpFailure, (state) => ({
    ...state,
    communicating: false,
    password: undefined,
  })),
  on(AuthSignUpActions.signUpFailureUsernameExists, (state) => ({
    ...state,
    communicating: false,
    password: undefined,
    userNameExists: true,
  })),
  on(AuthSignUpActions.signUpFailureInvalidParameter, (state) => ({
    ...state,
    communicating: false,
    password: undefined,
    userNameExists: false,
    invalidParameter: true,
  })),
  on(AuthSignUpActions.signUpFailurePasswordRequirements, (state) => ({
    ...state,
    communicating: false,
    password: undefined,
    userNameExists: false,
    passwordRequirements: true,
  })),
  on(
    AuthSignUpActions.signUpSuccess,
    (state, { username, password, email }) => ({
      ...state,
      communicating: false,
      username,
      password,
      email,
    })
  ),
  on(AuthSignUpActions.confirmRegistration, (state) => ({
    ...state,
    communicating: true,
    newVerificationCodeSent: false,
    newVerificationCodeLimitExceeded: false,
    newPasswordCodeFailedBecauseEmailNotVerified: false,
  })),
  on(AuthSignUpActions.confirmRegistrationSuccess, (state) => ({
    ...state,
    communicating: false,
  })),
  on(AuthSignUpActions.confirmRegistrationFailure, (state) => ({
    ...state,
    communicating: false,
  })),
  on(AuthSignUpActions.confirmRegistrationFailureCodeMismatch, (state) => ({
    ...state,
    verificationCodeMismatch: true,
    communicating: false,
    newVerificationCodeLimitExceeded: false,
  })),
  on(AuthSignUpActions.resendVerificationCode, (state) => ({
    ...state,
    communicating: true,
    newVerificationCodeSent: false,
    newVerificationCodeLimitExceeded: false,
    verificationCodeMismatch: false,
    newPasswordCodeFailedBecauseEmailNotVerified: false,
  })),
  on(AuthSignUpActions.resendVerificationCodeSuccess, (state) => ({
    ...state,
    communicating: false,
    newVerificationCodeSent: true,
    verificationCodeMismatch: false,
    newVerificationCodeLimitExceeded: false,
  })),
  on(AuthSignUpActions.resendVerificationCodeFailureLimitExceeded, (state) => ({
    ...state,
    communicating: false,
    newVerificationCodeSent: false,
    verificationCodeMismatch: false,
    newVerificationCodeLimitExceeded: true,
  })),
  on(
    AuthSignUpActions.redirectToSignUpVerification,
    (state, { username, password }) => ({
      ...state,
      username,
      password: password ? password : state.password,
      communicating: false,
      newVerificationCodeSent: false,
      newVerificationCodeLimitExceeded: false,
    })
  ),
  on(AuthSignInActions.authenticateUser, (state) => ({
    ...state,
    userNameExists: false,
  })),
  on(
    AuthSignInActions.requestNewPasswordCodeFailureInvalidParameter,
    (state, { username }) => ({
      ...state,
      username,
      newPasswordCodeFailedBecauseEmailNotVerified: true,
    })
  )
);

export const reducer = (state: SignUpState | undefined, action: Action) =>
  signUpReducer(state, action);
