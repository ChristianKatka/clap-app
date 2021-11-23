import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password-required-form',
  templateUrl: './sign-in-new-password-required-form.component.html',
  styleUrls: ['./sign-in-new-password-required-form.component.scss'],
})
export class SignInNewPasswordRequiredFormComponent {
  @Input()
  set isNewPasswordCommunicating(newPasswordCommunicating: boolean) {
    if (newPasswordCommunicating) {
      this.newPasswordForm.disable();
    } else {
      this.newPasswordForm.enable();
    }
  }

  @Input()
  errorCode: string | undefined;

  @Output()
  newPasswordSubmitted = new EventEmitter<any>();

  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
  });

  submit() {
    this.newPasswordSubmitted.next(
      (this.newPasswordForm.controls as any).password.value
    );
  }
}
