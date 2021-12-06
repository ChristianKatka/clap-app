import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyProfile } from '@shared/models/my-profile.model';

@Component({
  selector: 'clap-app-my-profile-edit-form',
  templateUrl: 'my-profile-edit-form.component.html',
  styleUrls: ['my-profile-edit-form.component.scss'],
})
export class MyProfileEditFormComponent implements OnChanges {
  @Input()
  myProfileData: MyProfile | undefined;

  @Output()
  addBio: EventEmitter<string> = new EventEmitter();

  @Input()
  loading = false;

  emailFormControl = new FormControl({ value: '', disabled: true });
  nicknameFormControl = new FormControl({ value: '', disabled: true });
  bioFormControl = new FormControl('');

  editProfileForm: FormGroup = new FormGroup({
    email: this.emailFormControl,
    nickname: this.nicknameFormControl,
    bio: this.bioFormControl,
  });

  ngOnChanges() {
    if (this.myProfileData) {
      this.emailFormControl.setValue(this.myProfileData.email);
      this.nicknameFormControl.setValue(this.myProfileData.nickname);
      this.bioFormControl.setValue(this.myProfileData.bio);
    }
  }

  submit(): void {
    this.addBio.emit(this.editProfileForm.value.bio);
  }
}
