import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
  createReducer,
  on,
} from '@ngrx/store';

import * as fromSignIn from './sign-in.reducer';
import * as fromSignUp from './sign-up.reducer';
import * as fromAuthenticated from './authenticated.reducer';
import * as fromInitialUrl from './initial-url.reducer';
import { AppState } from '@app/store/reducers';

export const featureKey = 'auth';

export interface AuthFeatureState {
  signIn: fromSignIn.SignInState;
  signUp: fromSignUp.SignUpState;
  authenticated: fromAuthenticated.AuthenticatedState;
  initialUrl: fromInitialUrl.InitialUrlState;
}

export interface AuthExtendedAppState extends AppState {
  auth: AuthFeatureState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  signIn: fromSignIn.reducer,
  signUp: fromSignUp.reducer,
  authenticated: fromAuthenticated.reducer,
  initialUrl: fromInitialUrl.reducer,
};

export const getAuthState = createFeatureSelector<
  AuthExtendedAppState,
  AuthFeatureState
>(featureKey);
export const getSignIn = createFeatureSelector<fromSignIn.SignInState>(
  'signIn'
);
export const getSignUp = createFeatureSelector<fromSignUp.SignUpState>(
  'signUp'
);
export const getAuthenticated = createFeatureSelector<fromAuthenticated.AuthenticatedState>(
  'authenticated'
);
export const getInitialUrlFromFeatureState = createFeatureSelector<fromInitialUrl.InitialUrlState>(
  'initialUrl'
);

export const getSignInState = createSelector(getAuthState, getSignIn);

export const getSignUpState = createSelector(getAuthState, getSignUp);

export const getAuthenticatedState = createSelector(
  getAuthState,
  getAuthenticated
);

export const getInitialUrlState = createSelector(
  getAuthState,
  getInitialUrlFromFeatureState
);
