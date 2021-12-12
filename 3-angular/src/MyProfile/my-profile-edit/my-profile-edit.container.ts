import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { MyProfileImageUploadControllerService } from '../services/my-profile-image-upload-controller.service';
import { MyProfileActions } from '../store/actions';
import { ProfileExtendedAppState } from '../store/reducers';
import { MyProfileSelectors, ProfileImageSelectors } from '../store/selectors';

@Component({
  templateUrl: 'my-profile-edit.container.html',
  styleUrls: ['my-profile-edit.container.scss'],
})
export class MyProfileEditContainerComponent {
  loading$ = this.store.select(MyProfileSelectors.isLoading);
  uploading$ = this.store.select(ProfileImageSelectors.isUploading);
  myProfileData$ = this.store.select(MyProfileSelectors.getMyProfile);

  constructor(
    private imageUploadControllerService: MyProfileImageUploadControllerService,
    private bottomSheetRef: MatBottomSheetRef<MyProfileEditContainerComponent>,
    private store: Store<ProfileExtendedAppState>
  ) {}



  onAddBio(bio: string) {
    this.store.dispatch(MyProfileActions.updateUserBio({ bio }));
  }

  onCloseBottomSheet() {
    this.bottomSheetRef.dismiss();
  }

  onProfileImageSelected(file: File) {
    this.imageUploadControllerService.uploadImage(file);
  }
}
