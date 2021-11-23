import { AuthSignInActions } from '../../store/actions';
import { AuthSignInSelectors } from '../../store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './sign-in-new-password-required.container.html',
  styleUrls: ['./sign-in-new-password-required.container.scss'],
})
export class SignInNewPasswordRequiredContainerComponent {
  isNewPasswordCommunicating$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.getIsNewPasswordCommunicating
  );
  newPasswordErrorCode$: Observable<any> = this.store.select(
    AuthSignInSelectors.getNewPasswordErrorCode
  );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onNewPasswordSubmit(password: string) {
    console.log('UUS PASSU');
    
    console.log(password);
    
    this.store.dispatch(AuthSignInActions.changeNewPassword({ password }));
  }
}
