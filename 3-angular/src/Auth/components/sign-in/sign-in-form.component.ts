import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInData } from '@auth/models/sign-in-data.model';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  // @Input()
  // set isSignInCommunicating(signInCommunicating: boolean) {
  //   if (signInCommunicating) {
  //     this.signInForm.disable();
  //   } else {
  //     this.signInForm.enable();
  //   }
  // }

  // @Input()
  // isWrongUserNameOrPassword = false;

  @Output()
  signIn = new EventEmitter<SignInData>();

  showPassword = false;

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    this.signIn.emit(this.signInForm.value);
  }
}
