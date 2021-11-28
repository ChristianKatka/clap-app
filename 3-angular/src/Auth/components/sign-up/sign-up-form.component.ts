import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  noWhiteSpaceAtStartOrEndPattern,
  onlyLettersAndNumbers,
} from '@shared/regex/regex';
import { PasswordsErrorStateMatcher } from '../../utils/passwords-error-state-matcher';
import { confirmPasswordsValidator } from './confirm-passwords.validator';

@Component({
  selector: 'clap-app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  @Output()
  showTermsOfService = new EventEmitter();
  @Output()
  showPrivacyPolicy = new EventEmitter();
  @Output()
  signUp: EventEmitter<any> = new EventEmitter();

  showPassword = false;
  showPasswordConfirm = false;
  matcher = new PasswordsErrorStateMatcher();

  emailAddressFormControl = new FormControl(null, [
    Validators.email,
    Validators.required,
  ]);
  nicknameFormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern(noWhiteSpaceAtStartOrEndPattern),
    Validators.pattern(onlyLettersAndNumbers),
  ]);

  passwordsForm = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(noWhiteSpaceAtStartOrEndPattern),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    [confirmPasswordsValidator]
  );

  signUpUserDataForm = new FormGroup({
    email: this.emailAddressFormControl,
    nickname: this.nicknameFormControl,
    passwords: this.passwordsForm,
  });

  submit() {
    const { email, nickname, passwords } = this.signUpUserDataForm.value;

    this.signUp.emit({
      username: email,
      email,
      nickname,
      password: passwords.password,
    });
  }
}
