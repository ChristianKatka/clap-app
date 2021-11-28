import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  AuthenticatedActions,
  AuthSignInActions,
  AuthSignUpActions,
  ErrorActions,
} from '@auth/store/actions';
import * as fromServices from '../../services/cognito.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthSignInSelectors } from '../selectors';
import { AuthExtendedAppState } from '../reducers';

@Injectable()
export class SignInEffects {
  signInAKAauthenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.authenticateUser),
      switchMap(({ signInData }) =>
        this.cognitoService
          .authenticateUser(signInData.username, signInData.password)
          .pipe(
            map((result: any) => {
              if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
                // CREATED USER FROM AWS CONSOLE
                return AuthSignInActions.newPasswordRequired();
              } else {
                return AuthenticatedActions.authenticateUserSuccess();
              }
            }),

            catchError((error: any) => {
              let action$;

              // REGISTERED FROM THE APP BUT NEVER CONFIRMED ACCOUNT WITH EMAIL CODE
              if (error.code === 'UserNotConfirmedException') {
                action$ = of(
                  AuthSignUpActions.redirectToSignUpVerification({
                    username: signInData.username,
                    password: signInData.password,
                  })
                );
                // WRONG PASSWORD
              } else if (error.code === 'NotAuthorizedException') {
                action$ = of(
                  AuthSignInActions.authenticateUserFailureNotAuthorized()
                );
                // WRONG USERNAME AKA EMAIL
              } else if (error.code === 'UserNotFoundException') {
                action$ = of(
                  AuthSignInActions.authenticateUserFailureNotAuthorized()
                );
              } else {
                action$ = of(
                  AuthenticatedActions.authenticateUserFailure(error)
                );
              }

              return action$;
            })
          )
      )
    )
  );

  authenticateUserAfterUserEmailConfirmed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.authenticateUserAfterUserEmailConfirmed),
      switchMap(({ username, password }) =>
        this.cognitoService.authenticateUser(username, password).pipe(
          map(() =>
            AuthenticatedActions.userAuthenticatedSuccessAfterUserEmailConfirmed()
          ),
          catchError((error: any) =>
            of(AuthenticatedActions.authenticateUserFailure(error))
          )
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

  // LOGIN WRONG USERNAME OR PASSWORD refressaa vaan sivun
  // authenticateUserFailureNotAuthorized$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthSignInActions.authenticateUserFailureNotAuthorized),
  //     map((action) => AuthSignInActions.redirectToSignIn(action))
  //   )
  // );

  // confirmNewPassword$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthSignInActions.confirmNewPassword),

  //     switchMap(({ username, password, code }) =>
  //       this.cognitoService.confirmPassword(username, password, code).pipe(
  //         map((result: any) =>
  //           AuthSignInActions.authenticateUser({
  //             signInData: { username, password },
  //           })
  //         ),

  //         catchError((error: any, caught: Observable<any>) => {
  //           if (error.code === 'CodeMismatchException') {
  //             return of(
  //               AuthSignInActions.confirmNewPasswordFailureCodeMismatch()
  //             );
  //           } else {
  //             return of(
  //               AuthSignInActions.confirmNewPasswordFailure(error.code)
  //             );
  //           }
  //         })
  //       )
  //     )
  //   )
  // );

  // TÄMÄ ON TUPLANA POISTA JOS TOIMIIII!
  // changeNewPassword$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthSignInActions.changeNewPassword),
  //     map((action) => action.password),
  //     withLatestFrom(this.store.select(AuthSignInSelectors.getSignInUserName)),
  //     switchMap(([password, username]) => {
  //       if (username === undefined || password === undefined) {
  //         return of(
  //           AuthSignInActions.authenticateUserFailure({
  //             error:
  //               'Cannot change new password if username or password is not given.',
  //           })
  //         );
  //       }

  //       return this.cognitoService.changePassword(password).pipe(
  //         map(
  //           () =>
  //             AuthSignInActions.authenticateUser({
  //               signInData: { username, password },
  //             }),
  //           catchError((error: any) => {
  //             console.log('Error changing password.');
  //             return of(AuthSignInActions.authenticateUserFailure({ error }));
  //           })
  //         )
  //       );
  //     })
  //   )
  // );

  changeNewPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignInActions.changeNewPassword),
      map((action) => action.newPassword),
      withLatestFrom(this.store.select(AuthSignInSelectors.getSignInUserName)),
      switchMap(([newPassword, username]) => {
        if (username === undefined) {
          return of(
            ErrorActions.signInUserNameDoesntExist({
              error: 'Cannot change new password if username doesnt exist.',
            })
          );
        }
        return this.cognitoService.changePassword(newPassword).pipe(
          map(() =>
            AuthSignInActions.authenticateUser({
              signInData: { username, password: newPassword },
            })
          ),
          catchError((error: any) =>
            of(AuthSignInActions.confirmNewPasswordFailure(error.code))
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
