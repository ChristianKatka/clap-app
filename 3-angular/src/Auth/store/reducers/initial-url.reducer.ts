import { createReducer, on, Action } from '@ngrx/store';
import { AuthInitialUrlActions } from '@auth/store/actions';

export interface InitialUrlState {
  initialUrl: string | undefined;
}

export const initialState: InitialUrlState = {
  initialUrl: undefined,
};

export const initialUrlReducer = createReducer(
  initialState,
  on(AuthInitialUrlActions.setInitialUrl, (state, { initialUrl }) => ({
    ...state,
    initialUrl,
  })),
  on(AuthInitialUrlActions.redirectToInitialUrl, (state, { initialUrl }) => ({
    ...state,
    initialUrl: undefined,
  }))
);

export const reducer = (state: InitialUrlState | undefined, action: Action) =>
  initialUrlReducer(state, action);
