import { AuthSignUpActions } from '@auth/store/actions';
import { AuthSignUpSelectors } from '@auth/store/selectors';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CognitoService } from '../services/cognito.service';
import { Injectable } from '@angular/core';
import { isString } from 'lodash-es';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SignUpVerificationGuard implements CanActivate {
  constructor(
    private store: Store<AuthExtendedAppState>,
    private cognitoService: CognitoService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.cognitoService.isSessionValid().pipe(
      map((loggedIn) => !loggedIn),

      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),

      map(
        ([notLoggedIn, userNameAndPassword]) =>
          notLoggedIn && isString(userNameAndPassword.username)
      ),

      tap((notLoggedInAndHasSignUpUserName) => {
        if (!notLoggedInAndHasSignUpUserName) {
          this.store.dispatch(AuthSignUpActions.redirectToSignUp());
        }
      })
    );
  }
}
