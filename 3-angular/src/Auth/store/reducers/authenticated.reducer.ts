import { createReducer, on, Action } from '@ngrx/store';
import { AuthenticatedActions, AuthSignInActions } from '@auth/store/actions';

export interface AuthenticatedState {
  userName?: string;
  authenticated: boolean;
  authenticating: boolean;
  checkingOldUserSession: boolean;
}

export const initialState: AuthenticatedState = {
  userName: undefined,
  authenticated: false,
  authenticating: false,
  checkingOldUserSession: false,
};

const authenticatedReducer = createReducer(
  initialState,
  on(AuthenticatedActions.checkOldUserSession, () => ({
    ...initialState,
    checkingOldUserSession: true,
  })),
  on(AuthenticatedActions.userRemembered, () => ({
    ...initialState,
    authenticated: true,
    checkingOldUserSession: false,
  })),
  on(AuthenticatedActions.userNotRemembered, () => ({
    ...initialState,
    checkingOldUserSession: false,
  })),
  on(AuthSignInActions.authenticateUser, () => ({
    ...initialState,
    authenticating: true,
  })),
  on(AuthenticatedActions.userAuthenticatedSuccess, () => ({
    ...initialState,
    authenticated: true,
    authenticating: false,
  })),
  on(
    AuthSignInActions.authenticateUserFailure ||
      AuthSignInActions.authenticateUserFailureNotAuthorized,
    () => ({
      ...initialState,
      authenticating: false,
    })
  ),
  on(AuthenticatedActions.signOutSuccess, () => ({
    ...initialState,
    authenticated: false,
  }))
);

export const reducer = (
  state: AuthenticatedState | undefined,
  action: Action
) => authenticatedReducer(state, action);
