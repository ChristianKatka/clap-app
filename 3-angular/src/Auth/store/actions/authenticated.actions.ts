import { createAction, props } from '@ngrx/store';

export const authenticateUserSuccess = createAction(
  '[Auth] Authenticate User Success'
);

export const authenticateUserFailure = createAction(
  '[Auth] Authenticate User Failure',
  props<{ error: string }>()
);

export const authenticateUserAfterUserEmailConfirmed = createAction(
  '[Auth] Authenticate User After User Email Confirmed',
  props<{ username: string; password: string }>()
);
export const authenticateUserAfterUserEmailConfirmedSuccess = createAction(
  '[Auth] Authenticate User After User Email Confirmed Success'
);

export const redirectToWelcomePage = createAction(
  '[Auth] Redirect To Welcome Page'
);

export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const redirectToAuthenticatedHome = createAction(
  '[Auth] Redirect to Authenticated Home'
);
export const redirectToUnauthenticatedHome = createAction(
  '[Auth] Redirect to Unauthenticated Home'
);
export const redirectToAppInitialization = createAction(
  '[Auth] Redirect to App Initialization'
);
