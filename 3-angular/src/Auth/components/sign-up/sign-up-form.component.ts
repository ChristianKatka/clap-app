import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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

  showPassword = false;
  showPasswordConfirm = false;

  // @Input()
  // set isSignUpCommunicating(isSignUpCommunicating: boolean) {
  //   if (isSignUpCommunicating) {
  //     this.isCommunicating = true;
  //     this.signUpUserDataForm.disable();
  //   } else {
  //     this.isCommunicating = false;
  //     this.signUpUserDataForm.enable();
  //   }
  // }

  // @Input()
  // isInvalidParameter = false;

  // @Input()
  // presetEmail: string | undefined | null;

  @Output()
  signUp: EventEmitter<any> = new EventEmitter();

  // isCommunicating = false;

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

  signUpUserDataForm = new FormGroup(
    {
      email: this.emailAddressFormControl,
      nickname: this.nicknameFormControl,
      passwords: this.passwordsFormGroup,
    }
  );

  // showPassword: boolean = false;
  // showPasswordConfirm: boolean = false;

  // ngOnChanges(changes: any) {
  //   if (changes && changes.presetEmail && changes.presetEmail.firstChange) {
  //     this.emailAddressFormControl.setValue(changes.presetEmail.currentValue);
  //   }
  // }

  // checkPasswords(group: FormGroup) {
  //   const pass = (group.controls as any).password.value;
  //   const confirmPass = (group.controls as any).passwordConfirm.value;
  //   return pass === confirmPass ? null : { notSame: true };
  // }

  submit() {
    // const { email, nickname, password, passwordConfirm } =
    //   this.signUpUserDataForm.value;
    // console.log({
    //   username: email,
    //   email,
    //   nickname,
    //   password,
    //   passwordConfirm,
    // });

    // this.signUp.next({
    //   username: email,
    //   email,
    //   nickname,
    //   password,
    // });
  }
}
