import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyProfile } from '@shared/models/my-profile.model';

@Component({
  selector: 'clap-app-my-profile-edit',
  templateUrl: 'my-profile-edit.component.html',
  styleUrls: ['my-profile-edit.component.scss'],
})
export class MyProfileEditComponent {
  @Input()
  myProfileData: MyProfile | undefined;

  @Input()
  loading = false;

  @Output()
  closeBottomSheet = new EventEmitter();

  @Output()
  addBio: EventEmitter<string> = new EventEmitter();
}
