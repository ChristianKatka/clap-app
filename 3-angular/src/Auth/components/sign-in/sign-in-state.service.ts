import { Injectable } from '@angular/core';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { AuthSignInSelectors } from '@auth/store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class SignInStateService {
  isLoading$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.isLoading
  );

  isWrongUsernameOrPassword$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.isWrongUsernameOrPassword
  );

  constructor(private store: Store<AuthExtendedAppState>) {}
}
