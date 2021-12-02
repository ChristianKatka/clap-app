import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateNewAccountOrLogOutBottomSheetComponent } from '../create-new-account-or-log-out-bottom-sheet/create-new-account-or-log-out-bottom-sheet.component';

@Injectable({
  providedIn: 'root',
})
export class MyProfileBottomSheetService {
  constructor(private bottomSheet: MatBottomSheet) {}

  openCreateNewAccountOrLogOutBottomSheet() {
    this.bottomSheet.open(CreateNewAccountOrLogOutBottomSheetComponent);
  }
}
