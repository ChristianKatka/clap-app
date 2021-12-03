import { createReducer, on, Action } from '@ngrx/store';
import { AuthenticatedActions } from '@auth/store/actions';

export interface AuthenticatedState {
  authenticated: boolean;
}

export const initialState: AuthenticatedState = {
  authenticated: false,
};

const authenticatedReducer = createReducer(
  initialState,
  on(AuthenticatedActions.authenticateUserSuccess, () => ({
    ...initialState,
    authenticated: true,
  })),
  on(AuthenticatedActions.signOutSuccess, () => ({
    ...initialState,
    authenticated: false,
  })),
  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (
  state: AuthenticatedState | undefined,
  action: Action
) => authenticatedReducer(state, action);
