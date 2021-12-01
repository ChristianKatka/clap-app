import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { RouterActions } from '../actions';
import { tap, map, filter } from 'rxjs/operators';
import {
  AuthenticatedActions,
  AuthSignInActions,
  AuthSignUpActions,
} from '@auth/store/actions';
import { isString } from 'lodash';

@Injectable()
export class RouterEffects {
  redirectToWelcomePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.redirectToWelcomePage),
      map(() => RouterActions.navigate({ commands: ['/welcome'] }))
    )
  );

  redirectToAppInitialization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.redirectToAppInitialization),
      map(() => RouterActions.navigate({ commands: ['/initializing'] }))
    )
  );

  // redirectToSignIn$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthenticatedActions.redirectToSignIn),
  //     map(() => RouterActions.navigate({ commands: ['/sign-in'] }))
  //   )
  // );

  redirectToNewPasswordRequired = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.redirectToNewPasswordRequired),
      map(() =>
        RouterActions.navigate({ commands: ['/new-password-required'] })
      )
    )
  );

  redirectToSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.redirectToSignUp),
      map(() => RouterActions.navigate({ commands: ['/sign-up'] }))
    )
  );

  redirectToEmailConfirmationView = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.redirectToEmailConfirmationView),
      map(() => RouterActions.navigate({ commands: ['/sign-up-confirmation'] }))
    )
  );

  redirectToAuthenticatedHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.redirectToAuthenticatedHome),
      map(() => RouterActions.navigate({ commands: ['/'] }))
    )
  );

  redirectToUnauthenticatedHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.redirectToUnauthenticatedHome),
      map(() => RouterActions.navigate({ commands: ['/sign-in'] }))
    )
  );

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.navigate),
        tap(({ commands, extras }) => {
          this.router.navigate(commands, extras);
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
