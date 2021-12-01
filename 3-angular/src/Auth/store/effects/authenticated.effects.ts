import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthenticatedActions } from '@auth/store/actions';
import { RouterActions } from '@app/store/actions';
import * as fromServices from '@auth/services/cognito.service';

@Injectable()
export class AuthenticatedEffects {

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
        AuthenticatedActions.authenticateUserSuccess
      ),
      map(() => AuthenticatedActions.redirectToAppInitialization())
    )
  );

  redirectToWelcomePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthenticatedActions.authenticateUserAfterUserEmailConfirmedSuccess
      ),
      map(() => AuthenticatedActions.redirectToWelcomePage())
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService
  ) {}
}
