import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthSignInActions, AuthSignUpActions } from '@auth/store/actions';
import * as fromServices from '../../services/cognito.service';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthSignUpSelectors } from '../selectors';
import { AuthExtendedAppState } from '../reducers';

@Injectable()
export class SignUpEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUp),
      switchMap(({ username, password, email, givenName, familyName }) =>
        this.cognitoService
          .signUp(username, password, email, givenName, familyName)
          .pipe(
            map(() =>
              AuthSignUpActions.signUpSuccess({
                username,
                password,
                email,
                givenName,
                familyName,
              })
            ),

            catchError((error: any, caught: Observable<any>) => {
              let action$;

              if (error.code === 'UsernameExistsException') {
                action$ = of(
                  AuthSignUpActions.signUpFailureUsernameExists({
                    username,
                  })
                );
              } else if (error.code === 'UserLambdaValidationException') {
                action$ = of(AuthSignUpActions.signUpFailureTermsNotAccepted());
              } else if (error.code === 'InvalidPasswordException') {
                action$ = of(
                  AuthSignUpActions.signUpFailurePasswordRequirements()
                );
              } else if (error.code === 'InvalidParameterException') {
                action$ = of(AuthSignUpActions.signUpFailureInvalidParameter());
              } else {
                action$ = of(AuthSignUpActions.signUpFailure(error));
              }

              return action$;
            })
          )
      )
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUpSuccess),
      map(({ username, password }) =>
        AuthSignUpActions.redirectToSignUpVerification({ username, password })
      )
    )
  );

  confirmRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistration),
      map((action) => action.code),

      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),

      switchMap(([code, { username, password }]) => {
        if (username === undefined || password === undefined) {
          return of(
            AuthSignUpActions.confirmRegistrationFailure({
              error:
                'Cannot confirm registration if username or password is missing.',
            })
          );
        }

        return this.cognitoService.confirmRegistration(username, code).pipe(
          map(() =>
            AuthSignUpActions.confirmRegistrationSuccess({
              username,
              password,
              code,
            })
          ),
          catchError((error: any) => {
            if (error.code === 'CodeMismatchException') {
              return of(
                AuthSignUpActions.confirmRegistrationFailureCodeMismatch()
              );
            } else {
              return of(
                AuthSignUpActions.confirmRegistrationFailure(error.code)
              );
            }
          })
        );
      })
    )
  );

  resendVerificationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.resendVerificationCode),

      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),

      switchMap(([payload, { username, password }]) => {
        if (username === undefined) {
          return of(
            AuthSignUpActions.resendVerificationCodeFailure({
              error: 'Cannot sign up if username is missing.',
            })
          );
        }

        return this.cognitoService.resendVerificationCode(username).pipe(
          map((result: any) =>
            AuthSignUpActions.resendVerificationCodeSuccess({
              username,
            })
          ),

          catchError((error: any) => {
            if (error.code === 'LimitExceededException') {
              return of(
                AuthSignUpActions.resendVerificationCodeFailureLimitExceeded()
              );
            } else {
              return of(
                AuthSignUpActions.resendVerificationCodeFailure({
                  error: error.code,
                })
              );
            }
          })
        );
      })
    )
  );

  confirmRegistrationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistrationSuccess),
      map(({ username, password }) =>
        AuthSignInActions.authenticateUserAfterUserVerified({
          username,
          password,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService,
    private store: Store<AuthExtendedAppState>
  ) {}
}
