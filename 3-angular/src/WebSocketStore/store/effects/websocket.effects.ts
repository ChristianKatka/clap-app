import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isString } from 'lodash-es';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { WebSocketService } from '../../services/websocket.service';
import { WebSocketActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class WebSocketEffects {
  initWebSocketSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthenticatedActions.authenticateUserSuccess,
        AuthenticatedActions.userRemembered
      ),
      map(() => WebSocketActions.createNewWebSocketSession())
    )
  );

  disconnectWSConnectionAtSignout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.signOut),
      map(() => WebSocketActions.disconnectWebSocketConnection())
    )
  );

  createNewWebSocketSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.createNewWebSocketSession),
      switchMap(() =>
        this.webSocketService.createNewSession().pipe(
          tap((x) => console.log(x)),
          map(({ userId, sessionKey }) =>
            WebSocketActions.createNewWebSocketSessionSuccess({
              userId,
              sessionKey,
            })
          ),
          catchError((error) =>
            of(WebSocketActions.createNewWebSocketSessionFailure(error))
          )
        )
      )
    )
  );

  createNewWebSocketSessionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.createNewWebSocketSessionSuccess),
      filter(
        ({ userId, sessionKey }) => isString(userId) && isString(sessionKey)
      ),
      map(({ userId, sessionKey }) =>
        WebSocketActions.takeWebSocketConnection({ userId, sessionKey })
      )
    )
  );

  takeWebSocketConnection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.takeWebSocketConnection),
      switchMap(({ userId, sessionKey }) =>
        this.webSocketService.takeWebSocketConnection(userId, sessionKey).pipe(
          map((response: string) =>
            WebSocketActions.takeWebSocketConnectionSuccess({
              payload: response,
            })
          ),
          catchError((error) =>
            of(WebSocketActions.takeWebSocketConnectionFailure(error))
          )
        )
      )
    )
  );

  pongMessageReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.receivedMessage),
      map((action) => action.message),
      filter((message) => message.ping && message.ping === 'pong'),
      tap(() => console.log('Received Pong message, send Ping')),
      map(() => WebSocketActions.sendPing())
    )
  );


  disconnectWebSocketConnectionAtSignout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WebSocketActions.disconnectWebSocketConnection),
        tap(() => {
          this.webSocketService.disconnectWebSocketConnection();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private webSocketService: WebSocketService
  ) {}
}
