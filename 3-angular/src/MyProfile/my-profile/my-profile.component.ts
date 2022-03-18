import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyProfileWithProfileImage } from '@shared/models/my-profile.model';

@Component({
  selector: 'clap-app-my-profile',
  templateUrl: 'my-profile.component.html',
  styleUrls: ['my-profile.component.scss'],
})
export class MyProfileComponent {
  @Input()
  myProfileData: MyProfileWithProfileImage = {
    id: '',
    email: '',
    nickname: '',
    bio: '',
    selectedLocation: '',
    profileImageUrl: '',
  };

  @Output()
  openEditProfileBottomSheet = new EventEmitter();
}
