import { AuthSignInActions } from '@auth/store/actions';
import {
  AuthSignInSelectors,
  AuthSignUpSelectors,
} from '@auth/store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './sign-in.container.html',
  styleUrls: ['./sign-in.container.scss'],
})
export class SignInContainerComponent {
  username$: Observable<string | undefined> = this.store.select(
    AuthSignInSelectors.getSignInUserName
  );
  isSignInCommunicating$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.getIsSignInCommunicating
  );
  isWrongUserNameOrPassword$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.getIsWrongUserNameOrPassword
  );
  isUserNameJustVerified$: Observable<boolean> = this.store.select(
    AuthSignInSelectors.getIsUserNameJustVerified
  );

  constructor(private store: Store<AuthExtendedAppState>) {}

  onSignInSubmit(formValue: { username: string; password: string }) {
    this.store.dispatch(AuthSignInActions.authenticateUser(formValue));
  }
}
