import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-verification-form',
  templateUrl: './sign-up-verification-form.component.html',
})
export class SignUpVerificationFormComponent {
  @Input()
  set isSignUpCommunicating(isSignUpCommunicating: boolean) {
    if (isSignUpCommunicating) {
      this.confirmationCodeForm.disable();
      this.isCommunicating = true;
    } else {
      this.confirmationCodeForm.enable();
      this.isCommunicating = false;
    }
  }

  @Input()
  isNewVerificationCodeSent = false;

  @Input()
  isNewVerificationCodeLimitExceeded = false;

  @Input()
  isNewPasswordCodeFailedBecauseEmailNotVerified = false;

  @Input()
  username: string | undefined | null;

  @Input()
  signUpVerificationCodeMismatch = false;

  @Output()
  signUpVerificationCodeSubmitted: EventEmitter<string> = new EventEmitter();

  @Output()
  newVerificationCodeOrderSubmitted: EventEmitter<boolean> = new EventEmitter();

  isCommunicating = false;

  confirmationCodeForm = new FormGroup({
    confirmationCode: new FormControl(null, [Validators.minLength(6)]),
  });

  submit() {
    this.signUpVerificationCodeSubmitted.next(
      this.confirmationCodeForm.value.confirmationCode
    );
  }

  newVerificationCode() {
    this.newVerificationCodeOrderSubmitted.next(true);
  }
}
