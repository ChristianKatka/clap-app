import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordsErrorStateMatcher } from '../../utils/passwords-error-state-matcher';
import { isNil } from 'lodash-es';

@Component({
  selector: 'app-confirm-password-form',
  templateUrl: './confirm-password-form.component.html',
  styleUrls: ['./confirm-password-form.component.scss'],
})
export class ConfirmPasswordFormComponent {
  @Input()
  set isSignInCommunicating(signInCommunicating: boolean) {
    if (signInCommunicating) {
      this.isCommunicating = true;
      this.confirmPasswordForm.disable();
    } else {
      this.isCommunicating = false;
      this.confirmPasswordForm.enable();
    }
  }

  @Input()
  username: string | undefined | null;

  @Input()
  isNewPasswordCodeMismatch = false;

  @Output()
  confirmPassword: EventEmitter<any> = new EventEmitter();

  passwordsFormGroup = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    [this.checkPasswords]
  );

  confirmPasswordForm: FormGroup = new FormGroup({
    //        userName: new FormControl(this.userName, [Validators.required]),
    code: new FormControl('', [Validators.minLength(6), Validators.required]),
    passwords: this.passwordsFormGroup,
  });

  isCommunicating = false;
  matcher = new PasswordsErrorStateMatcher();

  checkPasswords(group: AbstractControl) {
    const pass = group.get('password');
    const confirmPass = group.get('passwordConfirm');
    return pass === confirmPass ? null : { notSame: true };
  }

  isUsernameEmpty(): boolean {
    return isNil(this.username) || this.username.length < 1;
  }

  submit() {
    this.confirmPassword.next({
      code: this.confirmPasswordForm.value.code,
      username: this.username, // this.confirmPasswordForm.value.userName,
      password: this.confirmPasswordForm.value.passwords.password,
    });
  }
}
