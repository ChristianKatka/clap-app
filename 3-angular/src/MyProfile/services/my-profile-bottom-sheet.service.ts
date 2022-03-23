import { Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CreateNewAccountOrLogOutBottomSheetContainerComponent } from '../create-new-account-or-log-out-bottom-sheet/create-new-account-or-log-out-bottom-sheet.container';
import { MyProfileEditContainerComponent } from '../my-profile-edit/my-profile-edit.container';

@Injectable({
  providedIn: 'root',
})
export class MyProfileBottomSheetService {
  editProfileBottomSheetRef: MatBottomSheetRef | undefined;

  constructor(private bottomSheet: MatBottomSheet) {}

  openCreateNewAccountOrLogOutBottomSheet() {
    this.bottomSheet.open(
      CreateNewAccountOrLogOutBottomSheetContainerComponent,
      {
        panelClass: 'rounded-corners-bottomsheet',
      }
    );
  }

  openEditProfileBottomSheet() {
    this.editProfileBottomSheetRef = this.bottomSheet.open(
      MyProfileEditContainerComponent,
      {
        panelClass: 'edit-profile-bottomsheet',
      }
    );
  }

  closeEditProfileBottomSheet() {
    if (this.editProfileBottomSheetRef) {
      this.editProfileBottomSheetRef.dismiss();
      this.editProfileBottomSheetRef = undefined;
    }
  }
}
