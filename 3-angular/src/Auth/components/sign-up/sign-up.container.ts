import { AuthSignUpActions } from '@auth/store/actions';
import { Component } from '@angular/core';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { AboutActions } from 'src/About/store/actions';
import { SignUpUserData } from '@auth/models/sign-up-user-data.model';
import { SignUpStateService } from './sign-up-state.service';

@Component({
  templateUrl: './sign-up.container.html',
  providers: [SignUpStateService],
})
export class SignUpContainerComponent {
  constructor(
    private store: Store<AuthExtendedAppState>,
    public signUpStateService: SignUpStateService
  ) {}
  onShowPrivacyPolicy() {
    this.store.dispatch(AboutActions.showPrivacyPolicy());
  }

  onShowTermsOfService() {
    this.store.dispatch(AboutActions.showTermsOfService());
  }

  onSignUp(signUpUserData: SignUpUserData) {
    this.store.dispatch(
      AuthSignUpActions.signUp({
        signUpUserData,
      })
    );
  }
}
