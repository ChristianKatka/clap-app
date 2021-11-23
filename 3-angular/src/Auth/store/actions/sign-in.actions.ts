import { createAction, props } from '@ngrx/store';

export const authenticateUser = createAction(
  '[Auth] Authenticate User',
  props<{ username: string; password: string }>()
);

export const authenticateUserAfterUserVerified = createAction(
  '[Auth] Authenticate User After User Verified',
  props<{ username: string; password: string }>()
);

export const authenticateUserFailure = createAction(
  '[Auth] Authenticate User Failure',
  props<{ error: string }>()
);

export const authenticateUserFailureNotAuthorized = createAction(
  '[Auth] Authenticate User Failure, Not authorized',
  props<{ username: string }>()
);

export const newPasswordRequired = createAction('[Auth] New Password Required');

export const changeNewPassword = createAction(
  '[Auth] Change New Password',
  props<{ password: string }>()
);

export const requestNewPasswordCode = createAction(
  '[Auth] Request New Password Code',
  props<{ username: string }>()
);

export const requestNewPasswordCodeSuccess = createAction(
  '[Auth] Request New Password Code Success'
);

export const requestNewPasswordCodeFailure = createAction(
  '[Auth] Request New Password Code Failure',
  props<{ error: string }>()
);

export const requestNewPasswordCodeFailureLimitExceeded = createAction(
  '[Auth] Request New Password Code Failure, Limit exceeded'
);

export const requestNewPasswordCodeFailureUserNotFound = createAction(
  '[Auth] Request New Password Code Failure, User not found'
);

export const requestNewPasswordCodeFailureInvalidParameter = createAction(
  '[Auth] Request New Password Code Failure, Invalid parameter',
  props<{ username: string }>()
);

export const confirmNewPassword = createAction(
  '[Auth] Confirm New Password',
  props<{ username: string; password: string; code: string }>()
);

export const confirmNewPasswordSuccess = createAction(
  '[Auth] Confirm New Password Success',
  props<{ payload: string }>()
);

export const confirmNewPasswordFailure = createAction(
  '[Auth] Confirm New Password Failure',
  props<{ error: string }>()
);

export const confirmNewPasswordFailureCodeMismatch = createAction(
  '[Auth] Confirm New Password Failure, Code mismatch'
);

export const confirmNewPasswordError = createAction(
  '[Auth] Confirm New Password Error',
  props<{ payload: any }>()
);

export const redirectToSignIn = createAction(
  '[Auth] Redirect to Sign In',
  props<{ username: string }>()
);

export const redirectToConfirmPassword = createAction(
  '[Auth] Redirect to Confirm Password'
);

export const redirectToNewPasswordRequired = createAction(
  '[Auth] Redirect to New Password Required'
);
