import { createAction, props } from '@ngrx/store';

export const checkOldUserSession = createAction(
  '[Auth] Check Old User Session'
);
export const userRemembered = createAction(
  '[Auth] User Remembered',
  props<{ username: string }>()
);
export const userNotRemembered = createAction('[Auth] User Not Remembered');
export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const userAuthenticatedSuccess = createAction(
  '[Auth] User Authenticated Success'
);

export const redirectToWelcomeNew = createAction(
  '[Auth] Redirect to Welcome New'
);
export const redirectToAuthenticatedHome = createAction(
  '[Auth] Redirect to Authenticated Home'
);
export const redirectToUnauthenticatedHome = createAction(
  '[Auth] Redirect to Unauthenticated Home'
);
export const redirectToAppInitialization = createAction(
  '[Auth] Redirect to App Initialization'
);

export const redirectToAuthenticatedHomeOrInitialUrl = createAction(
  '[Auth] Redirect to Authenticated Home or Initial url'
);
