import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthSignInActions, AuthSignUpActions } from '@auth/store/actions';
import * as fromServices from '../../services/cognito.service';

import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthSignUpSelectors } from '../selectors';
import { AuthExtendedAppState } from '../reducers';

@Injectable()
export class SignUpEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUp),
      switchMap(({ signUpUserData }) =>
        this.cognitoService.signUp(signUpUserData).pipe(
          tap((x) => console.log(x)),
          map(() =>
            AuthSignUpActions.signUpSuccess({
              signUpUserData,
            })
          ),

          catchError((error: any, caught: Observable<any>) => {
            let action$;

            if (error.code === 'UsernameExistsException') {
              action$ = of(
                AuthSignUpActions.signUpFailureUsernameExists({
                  username: signUpUserData.username,
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
      map(({ signUpUserData }) =>
        AuthSignUpActions.redirectToSignUpVerification({
          username: signUpUserData.username,
          password: signUpUserData.password,
        })
      )
    )
  );

  confirmRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistration),
      map((payload) => payload.code),
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
          tap((x) => console.log(x)),
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

  sendNewEmailConfirmationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.sendNewEmailConfirmationCode),

      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),

      switchMap(([payload, { username, password }]) => {
        if (username === undefined) {
          return of(
            AuthSignUpActions.sendNewEmailConfirmationCodeFailure({
              error: 'Cannot sign up if username is missing.',
            })
          );
        }

        return this.cognitoService.sendNewEmailConfirmationCode(username).pipe(
          map(() =>
            AuthSignUpActions.sendNewEmailConfirmationCodeSuccess({
              username,
            })
          ),

          catchError((error: any) => {
            if (error.code === 'LimitExceededException') {
              return of(
                AuthSignUpActions.sendNewEmailConfirmationCodeFailureLimitExceeded()
              );
            } else {
              return of(
                AuthSignUpActions.sendNewEmailConfirmationCodeFailure({
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
        AuthSignInActions.authenticateUserAfterUserEmailConfirmed({
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
