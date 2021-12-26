import { Injectable } from '@angular/core';
import { InitActions } from '@app/store/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
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
        InitActions.loadApplicationInitializeDataSuccess
      ),
      map(() => WebSocketActions.createWebsocketSession())
    )
  );

  createWebsocketSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.createWebsocketSession),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      switchMap(([payload, userId]) => {
        if (!userId)
          return of(
            WebSocketActions.createWebsocketSessionFailure({
              error: 'no user id',
            })
          );

        return this.webSocketService.createWebsocketSession(userId).pipe(
          map((res: string) =>
            WebSocketActions.createWebsocketSessionSuccess({
              res,
            })
          ),
          catchError((error) =>
            of(
              WebSocketActions.createWebsocketSessionFailure({
                error: 'error creating websocket session',
              })
            )
          )
        );
      })
    )
  );

  disconnectWSConnectionAtSignout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.signOut),
      map(() => WebSocketActions.disconnectWebSocketConnection())
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
    private store: Store,
    private webSocketService: WebSocketService
  ) {}
}
