import { AuthSignUpActions } from '@auth/store/actions';
import { AuthSignUpSelectors } from '@auth/store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthExtendedAppState } from '@auth/store/reducers';

@Component({
  templateUrl: './sign-up-confirmation.container.html',
})
export class SignUpConfirmationContainerComponent {
  // isSignUpCommunicating$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getIsSignUpCommunicating
  // );
  // isNewVerificationCodeSent$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getIsNewVerificationCodeSent
  // );
  // isNewVerificationCodeLimitExceeded$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getIsNewVerificationCodeLimitExceeded
  // );
  // isNewPasswordCodeFailedBecauseEmailNotVerified$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getIsNewPasswordCodeFailedBecauseEmailNotVerified
  // );
  // signUpVerificationCodeMismatch$: Observable<boolean> = this.store.select(
  //   AuthSignUpSelectors.getSignUpVerificationCodeMismatch
  // );
  // username$: Observable<string | undefined> = this.store.select(
  //   AuthSignUpSelectors.getSignUpUserName
  // );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onSignUpConfirmationCodeSubmitted(code: string) {
    this.store.dispatch(AuthSignUpActions.confirmRegistration({ code }));
  }

  onNewConfirmationCodeOrderSubmitted() {
    console.log('send new confirmation code');
    
    // this.store.dispatch(AuthSignUpActions.resendVerificationCode());
  }
}
