import { SignUpUserData } from '@auth/models/sign-up-user-data.model';
import { createAction, props } from '@ngrx/store';

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ signUpUserData: SignUpUserData }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ signUpUserData: SignUpUserData }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: string }>()
);

export const signUpFailureUsernameExists = createAction(
  '[Auth] Sign Up Failure, username exists',
  props<{ username: string }>()
);

export const signUpFailureInvalidParameter = createAction(
  '[Auth] Sign Up Failure, invalid parameter'
);

export const signUpFailureTermsNotAccepted = createAction(
  '[Auth] Sign Up Failure, terms not accepted'
);

export const signUpFailurePasswordRequirements = createAction(
  '[Auth] Sign Up Failure, password requirements'
);

export const confirmRegistration = createAction(
  '[Auth] Confirm Registration',
  props<{ code: string }>()
);

export const confirmRegistrationSuccess = createAction(
  '[Auth] Confirm Registration Success',
  props<{ username: string; password: string; code: string }>()
);

export const confirmRegistrationFailure = createAction(
  '[Auth] Confirm Registration Failure',
  props<{ error: string }>()
);

export const confirmRegistrationFailureCodeMismatch = createAction(
  '[Auth] Confirm Registration Failure, code mismatch'
);

export const sendNewEmailConfirmationCode = createAction(
  '[Auth] Send New Email Confirmation Code'
);

export const sendNewEmailConfirmationCodeSuccess = createAction(
  '[Auth] Send New Email Confirmation Code Success',
  props<{ username: string }>()
);

export const sendNewEmailConfirmationCodeFailure = createAction(
  '[Auth] Send New Email Confirmation Code Failure',
  props<{ error: string }>()
);

export const sendNewEmailConfirmationCodeFailureLimitExceeded = createAction(
  '[Auth] Send New Email Confirmation Code Failure, limit exceeded'
);

export const redirectToSignUp = createAction('[Auth] Redirect to Sign Up');

export const redirectToSignUpVerification = createAction(
  '[Auth] Redirect to Sign Up Verification',
  props<{
    username: string;
    password?: string;
  }>()
);
