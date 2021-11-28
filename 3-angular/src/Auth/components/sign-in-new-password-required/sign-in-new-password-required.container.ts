import { AuthSignInActions } from '../../store/actions';
import { AuthSignInSelectors } from '../../store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: 'sign-in-new-password-required.container.html',
})
export class SignInNewPasswordRequiredContainerComponent {
  // isNewPasswordCommunicating$: Observable<boolean> = this.store.select(
  //   AuthSignInSelectors.getIsNewPasswordCommunicating
  // );
  // newPasswordErrorCode$: Observable<any> = this.store.select(
  //   AuthSignInSelectors.getNewPasswordErrorCode
  // );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onNewPasswordSubmitted(newPassword: string) {
    this.store.dispatch(AuthSignInActions.changeNewPassword({ newPassword }));
  }
}
