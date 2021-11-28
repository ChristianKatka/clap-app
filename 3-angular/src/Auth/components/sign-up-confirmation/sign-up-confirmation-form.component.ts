import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clap-app-sign-up-confirmation-form',
  templateUrl: 'sign-up-confirmation-form.component.html',
  styleUrls: ['sign-up-confirmation-form.component.scss']
})
export class SignUpConfirmationFormComponent {
  // @Input()
  // set isSignUpCommunicating(isSignUpCommunicating: boolean) {
  //   if (isSignUpCommunicating) {
  //     this.confirmationCodeForm.disable();
  //     this.isCommunicating = true;
  //   } else {
  //     this.confirmationCodeForm.enable();
  //     this.isCommunicating = false;
  //   }
  // }

  // @Input()
  // isNewVerificationCodeSent = false;

  // @Input()
  // isNewVerificationCodeLimitExceeded = false;

  // @Input()
  // isNewPasswordCodeFailedBecauseEmailNotVerified = false;

  // @Input()
  // username: string | undefined | null;

  // @Input()
  // signUpVerificationCodeMismatch = false;

  @Output()
  confirmationCodeSubmitted: EventEmitter<string> = new EventEmitter();

  @Output()
  sendNewEmailConfirmationCode = new EventEmitter();

  // isCommunicating = false;

  confirmationCodeForm = new FormGroup({
    confirmationCode: new FormControl(null, [Validators.minLength(6)]),
  });

  submit() {
    this.confirmationCodeSubmitted.emit(
      this.confirmationCodeForm.value.confirmationCode
    );
  }

  newEmailConfirmationCodeOrdered() {
    this.sendNewEmailConfirmationCode.emit();
  }
}
