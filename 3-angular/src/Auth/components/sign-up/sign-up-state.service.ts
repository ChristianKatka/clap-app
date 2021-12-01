import { Injectable } from '@angular/core';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { AuthSignUpSelectors } from '@auth/store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpStateService {
  isLoading$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isLoading
  );

  usernameAlreadyExists$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.usernameAlreadyExists
  );

  constructor(private store: Store<AuthExtendedAppState>) {}
}
