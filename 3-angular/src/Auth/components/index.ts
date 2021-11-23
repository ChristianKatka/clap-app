import { ConfirmPasswordFormComponent } from './confirm-password/confirm-password-form.component';
import { ConfirmPasswordContainerComponent } from './confirm-password/confirm-password.container';

import { SignInContainerComponent } from './sign-in/sign-in.container';
import { SignInFormComponent } from './sign-in/sign-in-form.component';

import { SignInNewPasswordRequiredContainerComponent } from './sign-in-new-password-required/sign-in-new-password-required.container';
import { SignInNewPasswordRequiredFormComponent } from './sign-in-new-password-required/sign-in-new-password-required-form.component';

import { SignUpVerificationContainerComponent } from './sign-up-verification/sign-up-verification.container';
import { SignUpVerificationFormComponent } from './sign-up-verification/sign-up-verification-form.component';

export const containers: any[] = [
  ConfirmPasswordContainerComponent,
  SignInContainerComponent,
  SignInNewPasswordRequiredContainerComponent,
  SignUpVerificationContainerComponent,
];

export const components: any[] = [
  ConfirmPasswordFormComponent,
  SignInNewPasswordRequiredFormComponent,
  SignInFormComponent,
  SignUpVerificationFormComponent,
];
