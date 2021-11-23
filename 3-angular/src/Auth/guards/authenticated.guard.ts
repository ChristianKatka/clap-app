import { AuthenticatedActions } from '../store/actions';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CognitoService } from '../services/cognito.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store<AuthExtendedAppState>,
    private cognitoService: CognitoService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.cognitoService.isSessionValid().pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(
            AuthenticatedActions.redirectToUnauthenticatedHome()
          );
        }
      })
    );
  }
}
