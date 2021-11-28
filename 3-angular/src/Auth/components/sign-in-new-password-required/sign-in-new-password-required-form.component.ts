import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhiteSpaceAtStartOrEndPattern } from '@shared/regex/regex';

@Component({
  selector: 'app-new-password-required-form',
  templateUrl: './sign-in-new-password-required-form.component.html',
  styleUrls: ['./sign-in-new-password-required-form.component.scss'],
})
export class SignInNewPasswordRequiredFormComponent {
  // @Input()
  // set isNewPasswordCommunicating(newPasswordCommunicating: boolean) {
  //   if (newPasswordCommunicating) {
  //     this.newPasswordForm.disable();
  //   } else {
  //     this.newPasswordForm.enable();
  //   }
  // }

  @Output()
  newPasswordSubmitted = new EventEmitter<string>();

  showPassword = false;

  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(noWhiteSpaceAtStartOrEndPattern),
    ]),
  });

  submit() {
    this.newPasswordSubmitted.emit(this.newPasswordForm.value.password);
  }
}
