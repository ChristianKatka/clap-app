import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  AuthenticatedActions,
  AuthSignInActions,
  AuthSignUpActions,
} from '@auth/store/actions';
import * as fromServices from '../../services/cognito.service';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthSignInSelectors } from '../selectors';
import { AuthExtendedAppState } from '../reducers';

@Injectable()
export class SignInEffects {
  authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthSignInActions.authenticateUser,
        AuthSignInActions.authenticateUserAfterUserVerified
      ),
      switchMap(({ username, password }) =>
        this.cognitoService.authenticateUser(username, password).pipe(
          map((result: any) => {
            if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
              return AuthSignInActions.newPasswordRequired();
            } else {
              return AuthenticatedActions.userAuthenticatedSuccess();
            }
          }),

          catchError((error: any, caught: Observable<any>) => {
            let action$;

            if (error.code === 'UserNotConfirmedException') {
              action$ = of(
                AuthSignUpActions.redirectToSignUpVerification({
                  username,
                  password,
                })
              );
            } else if (error.code === 'NotAuthorizedException') {
              action$ = of(
                AuthSignInActions.authenticateUserFailureNotAuthorized({
                  username,
                })
              );
            } else if (error.code === 'UserNotFoundException') {
              action$ = of(
                AuthSignInActions.authenticateUserFailureNotAuthorized({
                  username,
                })
              );
            } else {
              action$ = of(AuthSignInActions.authenticateUserFailure(error));
            }

            return action$;
          })
        )
      )
    )
  );

  authenticateUserNewPasswordRequired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.newPasswordRequired),
      map(() => AuthSignInActions.redirectToNewPasswordRequired())
    )
  );

  authenticateUserFailureNotAuthorized$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.authenticateUserFailureNotAuthorized),
      map((action) => AuthSignInActions.redirectToSignIn(action))
    )
  );

  requestNewPasswordCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.requestNewPasswordCode),
      switchMap(({ username }) =>
        this.cognitoService.requestChangePasswordCode(username).pipe(
          map(() => AuthSignInActions.requestNewPasswordCodeSuccess()),

          catchError((error: any) => {
            if (error.code === 'LimitExceededException') {
              return of(
                AuthSignInActions.requestNewPasswordCodeFailureLimitExceeded()
              );
            } else if (error.code === 'UserNotFoundException') {
              return of(
                AuthSignInActions.requestNewPasswordCodeFailureUserNotFound()
              );
            } else if (error.code === 'InvalidParameterException') {
              return of(
                AuthSignInActions.requestNewPasswordCodeFailureInvalidParameter(
                  {
                    username,
                  }
                )
              );
            } else {
              return of(AuthSignInActions.requestNewPasswordCodeFailure(error));
            }
          })
        )
      )
    )
  );

  requestNewPasswordCodeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.requestNewPasswordCodeSuccess),
      map(() => AuthSignInActions.redirectToConfirmPassword())
    )
  );

  requestNewPasswordCodeFailureInvalidParameter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.requestNewPasswordCodeFailureInvalidParameter),
      map(({ username }) =>
        AuthSignUpActions.redirectToSignUpVerification({ username })
      )
    )
  );

  confirmNewPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.confirmNewPassword),

      switchMap(({ username, password, code }) =>
        this.cognitoService.confirmPassword(username, password, code).pipe(
          map((result: any) =>
            AuthSignInActions.authenticateUser({
              username,
              password,
            })
          ),

          catchError((error: any, caught: Observable<any>) => {
            if (error.code === 'CodeMismatchException') {
              return of(
                AuthSignInActions.confirmNewPasswordFailureCodeMismatch()
              );
            } else {
              return of(
                AuthSignInActions.confirmNewPasswordFailure(error.code)
              );
            }
          })
        )
      )
    )
  );

  changeNewPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.changeNewPassword),
      map((action) => action.password),
      withLatestFrom(this.store.select(AuthSignInSelectors.getSignInUserName)),
      switchMap(([password, username]) => {
        if (username === undefined || password === undefined) {
          return of(
            AuthSignInActions.authenticateUserFailure({
              error:
                'Cannot change new password if username or password is not given.',
            })
          );
        }

        return this.cognitoService.changePassword(password).pipe(
          map(
            () =>
              AuthSignInActions.authenticateUser({
                username,
                password,
              }),
            catchError((error: any) => {
              console.log('Error changing password.');
              return of(AuthSignInActions.authenticateUserFailure({ error }));
            })
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService,
    private store: Store<AuthExtendedAppState>
  ) {}
}
