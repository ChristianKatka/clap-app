import { AuthSignInActions } from '@auth/store/actions';
import { Component } from '@angular/core';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { SignInData } from '@auth/models/sign-in-data.model';
import { SignInStateService } from './sign-in-state.service';

@Component({
  templateUrl: './sign-in.container.html',
  providers: [SignInStateService],
})
export class SignInContainerComponent {
  constructor(
    private store: Store<AuthExtendedAppState>,
    public signInStateService: SignInStateService
  ) {}

  onSignIn(signInData: SignInData) {
    this.store.dispatch(AuthSignInActions.authenticateUser({ signInData }));
  }
}
