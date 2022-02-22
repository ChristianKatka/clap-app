import { Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ChangeLocationBottomSheetContainerComponent } from './change-location-bottom-sheet/change-location-bottom-sheet.container';

@Injectable({ providedIn: 'root' })
export class LocationBottomSheetService {
  bottomSheetRef: MatBottomSheetRef | undefined;

  constructor(private bottomSheet: MatBottomSheet) {}

  openChangeLocationBottomSheet() {
    this.bottomSheet.open(ChangeLocationBottomSheetContainerComponent);
  }
}
