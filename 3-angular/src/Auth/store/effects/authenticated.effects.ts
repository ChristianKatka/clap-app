import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  AuthenticatedActions,
  AuthInitialUrlActions,
} from '@auth/store/actions';
import { RouterActions } from '@app/store/actions';
import * as fromServices from '@auth/services/cognito.service';
import { AuthInitialURLSelectors } from '../selectors';
import { AuthExtendedAppState } from '../reducers';

@Injectable()
export class AuthenticatedEffects {
  checkOldUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.checkOldUserSession),
      switchMap(() => this.cognitoService.isSessionValid()),
      switchMap((isValid) => {
        if (isValid) {
          return this.cognitoService.getCurrentUser();
        } else {
          return of(undefined);
        }
      }),
      map((user) => {
        if (user) {
          return AuthenticatedActions.userRemembered({
            username: user.getUsername(),
          });
        } else {
          return AuthenticatedActions.userNotRemembered();
        }
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.signOut),
      tap(() => {
        this.cognitoService.signOut();
      }),

      map(() => AuthenticatedActions.signOutSuccess())
    )
  );

  signOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.signOutSuccess),
      map(() =>
        RouterActions.navigate({
          commands: ['/sign-in'],
        })
      )
    )
  );

  redirectToAppInitialization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthenticatedActions.userAuthenticatedSuccess,
        AuthenticatedActions.userRemembered
      ),
      map(() => AuthenticatedActions.redirectToAppInitialization())
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService,
    private store: Store<AuthExtendedAppState>
  ) {}
}
