import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { LocationSelectors } from 'src/PostsStore/store/selectors';
import { LocationBottomSheetService } from './change-location.service';

@Component({
  selector: 'clap-app-location-container',
  templateUrl: 'location.container.html',
})
export class LocationContainerComponent {
  selectedPostLocation$ = this.store.select(
    LocationSelectors.getSelectedPostLocation
  );

  constructor(
    private locationBottomSheetService: LocationBottomSheetService,
    private store: Store<PostsExtendedAppState>
  ) {}

  openChangeLocationBottomSheet() {
    this.locationBottomSheetService.openChangeLocationBottomSheet();
  }
}
