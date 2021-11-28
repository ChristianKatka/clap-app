import { AuthSignUpActions } from '@auth/store/actions';
import { AuthSignUpSelectors } from '@auth/store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { AboutActions } from 'src/About/store/actions';
import { SignUpUserData } from '@auth/models/sign-up-user-data.model';

@Component({
  templateUrl: './sign-up.container.html',
  styleUrls: ['./sign-up.container.scss'],
})
export class SignUpContainerComponent {
  constructor(private store: Store<AuthExtendedAppState>) {}
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

  // isSignUpCommunicating$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getIsSignUpCommunicating
  // );
  // isInvalidParameter$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getIsInvalidParameter
  // );
  // usernameExists$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getSignUpUserNameExists
  // );
  // username$: Observable<string | undefined> = this.store.select(
  //   AuthSignUpSelectors.getSignUpUsername
  // );
}
