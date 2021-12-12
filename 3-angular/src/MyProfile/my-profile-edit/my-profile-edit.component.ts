import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'clap-app-my-profile-edit',
  templateUrl: 'my-profile-edit.component.html',
  styleUrls: ['my-profile-edit.component.scss'],
})
export class MyProfileEditComponent {
  @Input()
  myProfileData: any;

  @Input()
  loading = false;
  @Input()
  uploading = false;

  @Output()
  closeBottomSheet = new EventEmitter();

  @Output()
  addBio: EventEmitter<string> = new EventEmitter();

  @Output()
  profileImageSelected: EventEmitter<File> = new EventEmitter();
}
