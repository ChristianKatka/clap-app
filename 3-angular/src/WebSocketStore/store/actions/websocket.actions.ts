import { createAction, props } from '@ngrx/store';

export const createWebsocketSession = createAction(
  '[WebSocket] Create Websocket Session'
);

export const createWebsocketSessionSuccess = createAction(
  '[WebSocket] Create Websocket Session Success',
  props<{ res: any }>()
);

export const createWebsocketSessionFailure = createAction(
  '[WebSocket] Create Websocket Session Failure',
  props<{ error: string }>()
);

// export const takeWebSocketConnection = createAction(
//   '[Web Socket] Take Web Socket Connection',
//   props<{ userId: string; sessionKey: string }>()
// );

// export const takeWebSocketConnectionSuccess = createAction(
//   '[Web Socket] Take Web Socket Connection Success',
//   props<{ payload: string }>()
// );

// export const takeWebSocketConnectionFailure = createAction(
//   '[Web Socket] Take Web Socket Connection Failure',
//   props<{ payload: any }>()
// );

export const disconnectWebSocketConnection = createAction(
  '[Web Socket] Disconnect Web Socket Connection'
);

export const disconnectWebSocketConnectionSuccess = createAction(
  '[Web Socket] Disconnect Web Socket Connection Success',
  props<{ payload: string }>()
);

export const disconnectWebSocketConnectionFailure = createAction(
  '[Web Socket] Disconnect Web Socket Connection Failure',
  props<{ payload: any }>()
);

export const receivedMessage = createAction(
  '[Web Socket] Received Message',
  props<{ message: any }>()
);

export const sendPing = createAction('[Web Socket] Send Ping');
export const sendPingSuccess = createAction('[Web Socket] Send Ping Success');
export const sendPingFailure = createAction('[Web Socket] Send Ping Failure');
