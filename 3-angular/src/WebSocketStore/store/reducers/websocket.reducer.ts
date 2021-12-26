import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { WebSocketActions } from '../actions';

export interface WebSocketState {
  sessionKey: string | undefined;
}

export const initialState: WebSocketState = {
  sessionKey: undefined,
};

const webSocketReducer = createReducer(
  initialState,

  // on(WebSocketActions.createNewWebSocketSessionSuccess, (state, payload) => ({
  //   ...state,
  //   sessionKey: payload.sessionKey,
  // })),
  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: WebSocketState | undefined, action: Action) =>
  webSocketReducer(state, action);
