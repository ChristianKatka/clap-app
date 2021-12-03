import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateNewAccountOrLogOutBottomSheetContainerComponent } from '../create-new-account-or-log-out-bottom-sheet/create-new-account-or-log-out-bottom-sheet.container';

@Injectable({
  providedIn: 'root',
})
export class MyProfileBottomSheetService {
  constructor(private bottomSheet: MatBottomSheet) {}

  openCreateNewAccountOrLogOutBottomSheet() {
    this.bottomSheet.open(CreateNewAccountOrLogOutBottomSheetContainerComponent);
  }
}
