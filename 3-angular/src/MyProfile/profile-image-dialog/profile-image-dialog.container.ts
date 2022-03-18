import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MyProfileWithProfileImage } from '@shared/models/my-profile.model';
import { Observable } from 'rxjs';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { MyProfileSelectors } from '../store/selectors';

@Component({
  selector: 'clap-app-profile-image-dialog',
  templateUrl: 'profile-image-dialog.container.html',
  styleUrls: ['profile-image-dialog.container.scss'],
})
export class ProfileImageDialogContainerComponent {
  myProfileData$: Observable<MyProfileWithProfileImage> = this.store.select(
    MyProfileSelectors.getMyProfile
  );

  constructor(
    private store: Store<PostsExtendedAppState>,
    public dialogRef: MatDialogRef<ProfileImageDialogContainerComponent>
  ) {}

  exitDialog() {
    this.dialogRef.close();
  }
}
