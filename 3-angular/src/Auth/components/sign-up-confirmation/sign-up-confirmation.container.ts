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
  isLoading$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isLoading
  );
  newConfirmationCodeSent$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isNewConfirmationCodeSent
  );
  // To show user which email has the new confirmation code sent
  email$ = this.store.select(AuthSignUpSelectors.getEmail);
  emailConfirmationCodeMismatch$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.isEmailConfirmationCodeMismatch
  );
  newConfirmationCodeLimitExceeded$: Observable<boolean> = this.store.select(
    AuthSignUpSelectors.newConfirmationCodeLimitExceeded
  );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onConfirmationCodeSubmitted(code: string) {
    this.store.dispatch(
      AuthSignUpActions.confirmRegistrationByEmailCode({ code })
    );
  }

  onSendNewEmailConfirmationCode() {
    this.store.dispatch(AuthSignUpActions.sendNewEmailConfirmationCode());
  }
}
