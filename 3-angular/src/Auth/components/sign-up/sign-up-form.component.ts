import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhiteSpaceAtStartOrEndPattern } from '@shared/regex/regex';
import { PasswordsErrorStateMatcher } from '../../utils/passwords-error-state-matcher';
import { confirmPasswordsValidator } from './confirm-passwords.validator';

@Component({
  selector: 'clap-app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnChanges {
  @Input()
  set isSignUpCommunicating(isSignUpCommunicating: boolean) {
    if (isSignUpCommunicating) {
      this.isCommunicating = true;
      this.signUpUserDataForm.disable();
    } else {
      this.isCommunicating = false;
      this.signUpUserDataForm.enable();
    }
  }

  @Input()
  isInvalidParameter = false;

  @Input()
  presetEmail: string | undefined | null;

  @Output()
  signUpDataSubmitted: EventEmitter<any> = new EventEmitter();

  @Output()
  showTermsOfService: EventEmitter<string> = new EventEmitter();

  @Output()
  showPrivacyPolicy: EventEmitter<string> = new EventEmitter();

  isCommunicating = false;

  emailAddressFormControl = new FormControl(null, [
    Validators.email,
    Validators.required,
  ]);

  passwordsFormGroup = new FormGroup(
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
    emailAddress: this.emailAddressFormControl,
    passwords: this.passwordsFormGroup,
  });

  matcher = new PasswordsErrorStateMatcher();

  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  ngOnChanges(changes: any) {
    if (changes && changes.presetEmail && changes.presetEmail.firstChange) {
      this.emailAddressFormControl.setValue(changes.presetEmail.currentValue);
    }
  }

  checkPasswords(group: FormGroup) {
    const pass = (group.controls as any).password.value;
    const confirmPass = (group.controls as any).passwordConfirm.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  submit() {
    const { emailAddress, passwords } = this.signUpUserDataForm.value;
    this.signUpDataSubmitted.next({
      username: emailAddress,
      email: emailAddress,
      password: passwords.password,
    });
  }

  onShowTermsOfService() {
    this.showTermsOfService.emit();
  }
  onShowPrivacyPolicy() {
    this.showPrivacyPolicy.emit();
  }
}
