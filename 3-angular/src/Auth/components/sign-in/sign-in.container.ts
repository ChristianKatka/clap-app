import { AuthSignInActions } from '@auth/store/actions';
import { AuthSignInSelectors } from '@auth/store/selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { SignInData } from '@auth/models/sign-in-data.model';
import { SignInStateService } from './sign-in-state.service';

@Component({
  templateUrl: './sign-in.container.html',
  styleUrls: ['./sign-in.container.scss'],
  providers: [SignInStateService],
})
export class SignInContainerComponent {
  // username$: Observable<string | undefined> = this.store.select(
  //   AuthSignInSelectors.getSignInUserName
  // );
  // isSignInCommunicating$: Observable<boolean> = this.store.select(
  //   AuthSignInSelectors.getIsSignInCommunicating
  // );
  // isWrongUserNameOrPassword$: Observable<boolean> = this.store.select(
  //   AuthSignInSelectors.getIsWrongUserNameOrPassword
  // );
  // isUserNameJustVerified$: Observable<boolean> = this.store.select(
  //   AuthSignInSelectors.getIsUserNameJustVerified
  // );

  constructor(
    private store: Store<AuthExtendedAppState>,
    public signInStateService: SignInStateService
  ) {}

  onSignIn(signInData: SignInData) {
    this.store.dispatch(AuthSignInActions.authenticateUser({ signInData }));
  }
}
