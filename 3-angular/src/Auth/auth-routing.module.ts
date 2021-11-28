import { ConfirmPasswordContainerComponent } from './components/confirm-password/confirm-password.container';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInContainerComponent } from './components/sign-in/sign-in.container';
import { SignInNewPasswordRequiredContainerComponent } from './components/sign-in-new-password-required/sign-in-new-password-required.container'; // eslint-disable-line
import { SignUpConfirmationContainerComponent } from './components/sign-up-confirmation/sign-up-confirmation.container';
import { UnauthenticatedGuard, SignUpVerificationGuard } from './guards';
import { SignUpContainerComponent } from './components/sign-up/sign-up.container';

export const authRoutes: Routes = [
  {
    path: 'sign-up',
    canActivate: [UnauthenticatedGuard],
    component: SignUpContainerComponent,
  },
  {
    path: 'sign-up-verification',
    canActivate: [SignUpVerificationGuard],
    component: SignUpConfirmationContainerComponent,
  },

  {
    path: 'sign-in',
    canActivate: [UnauthenticatedGuard],
    component: SignInContainerComponent,
  },

  {
    path: 'new-password-required',
    canActivate: [UnauthenticatedGuard],
    component: SignInNewPasswordRequiredContainerComponent,
  },

  {
    path: 'confirm-password',
    canActivate: [UnauthenticatedGuard],
    component: ConfirmPasswordContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
