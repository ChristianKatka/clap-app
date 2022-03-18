import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyProfileWithProfileImage } from '@shared/models/my-profile.model';
import { ProfileImageDialogContainerComponent } from '../profile-image-dialog/profile-image-dialog.container';

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

  constructor(public dialog: MatDialog) {}

  showProfileImage() {
    this.dialog.open(
      ProfileImageDialogContainerComponent,
      {
        panelClass: 'media-dialog',
        maxWidth: '100vw',
      }
    );
  }
}
