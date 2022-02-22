import { Component } from '@angular/core';
import { LocationBottomSheetService } from './change-location.service';

@Component({
  selector: 'clap-app-location-container',
  templateUrl: 'location.container.html',
})
export class LocationContainerComponent {
  constructor(private locationBottomSheetService: LocationBottomSheetService) {}

  openChangeLocationBottomSheet() {
    this.locationBottomSheetService.openChangeLocationBottomSheet();
  }
}
