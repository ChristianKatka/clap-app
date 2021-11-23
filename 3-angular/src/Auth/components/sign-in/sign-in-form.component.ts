import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  @Input()
  set isSignInCommunicating(signInCommunicating: boolean) {
    if (signInCommunicating) {
      this.signInForm.disable();
    } else {
      this.signInForm.enable();
    }
  }

  @Input()
  username: string | undefined | null;

  @Input()
  isWrongUserNameOrPassword = false;

  @Input()
  isUserNameJustVerified = false;

  @Output()
  signInDataSubmitted: EventEmitter<any> = new EventEmitter<any>();

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    this.signInDataSubmitted.next(this.signInForm.value);
  }
}
