import { AuthenticatedActions } from '@auth/store/actions';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CognitoService } from '../services/cognito.service';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
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

      tap((notLoggedIn) => {
        if (!notLoggedIn) {
          this.store.dispatch(
            AuthenticatedActions.redirectToAuthenticatedHome()
          );
        }
      })
    );
  }
}
