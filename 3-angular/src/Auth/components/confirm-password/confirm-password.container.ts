import { AuthSignInActions } from '../../store/actions';
import { AuthSignInSelectors } from '../../store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './confirm-password.container.html',
  styleUrls: ['./confirm-password.container.scss'],
})
export class ConfirmPasswordContainerComponent {
  username$: Observable<string | undefined> = this.store.select(
    AuthSignInSelectors.getSignInUserName
  );
  isSignInCommunicating$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.getIsSignInCommunicating
  );
  isNewPasswordCodeMismatch$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.getIsNewPasswordCodeMismatch
  );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onConfirmPassword(formValue: any) {
    this.store.dispatch(
      AuthSignInActions.confirmNewPassword({
        username: formValue.username,
        code: formValue.code,
        password: formValue.password,
      })
    );
  }
}
