import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  templateUrl: 'create-new-account-or-log-out-bottom-sheet.component.html',
  styleUrls: ['create-new-account-or-log-out-bottom-sheet.component.scss'],
})
export class CreateNewAccountOrLogOutBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CreateNewAccountOrLogOutBottomSheetComponent>
  ) {}

  ngOnInit() {}

  close() {
    this.bottomSheetRef.dismiss();
  }
}
