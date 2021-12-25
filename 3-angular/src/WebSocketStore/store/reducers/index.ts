import { AppState } from '@app/store/reducers';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromWebSocket from './websocket.reducer';

export const featureKey = 'websocket';

export interface WebSocketFeatureState {
  websocket: fromWebSocket.WebSocketState;
}

export interface WebSocketsExtendedAppState extends AppState {
  websocket: WebSocketFeatureState;
}

export const reducers: ActionReducerMap<WebSocketFeatureState> = {
  websocket: fromWebSocket.reducer,
};

export const getWebSocketState =
  createFeatureSelector<fromWebSocket.WebSocketState>(featureKey);
