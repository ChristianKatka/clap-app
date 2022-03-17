import { Component, OnInit } from '@angular/core';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { LocationActions } from 'src/PostsStore/store/actions';
import { LocationSelectors } from 'src/PostsStore/store/selectors';
import { LocationBottomSheetService } from '../change-location.service';

@Component({
  templateUrl: 'change-location-bottom-sheet.container.html',
  styleUrls: ['change-location-bottom-sheet.container.scss'],
})
export class ChangeLocationBottomSheetContainerComponent implements OnInit {
  selectedPostLocation$ = this.store.select(
    LocationSelectors.getSelectedPostLocation
  );
  postLocations$ = this.store.select(LocationSelectors.getPostLocations);

  constructor(
    private store: Store<AuthExtendedAppState>,
    private locationBottomSheetService: LocationBottomSheetService
  ) {}

  ngOnInit() {}

  close() {
    this.locationBottomSheetService.closeChangeLocationBottomSheet();
  }

  logOut() {
    this.close();
  }

  searchTextInputted(searchText: string) {
    this.store.dispatch(LocationActions.searchLocation({ searchText }));
  }
  onSelectLocation(location: string) {
    this.store.dispatch(LocationActions.selectLocation({ location }));
  }
}
