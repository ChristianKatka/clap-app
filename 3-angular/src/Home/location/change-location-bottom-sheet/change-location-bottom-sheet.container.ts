import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { PostLocation } from '@shared/models/post-location.model';
import { LocationActions } from 'src/PostsStore/store/actions';
import { LocationSelectors } from 'src/PostsStore/store/selectors';

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
    private bottomSheetRef: MatBottomSheetRef<ChangeLocationBottomSheetContainerComponent>,
    private store: Store<AuthExtendedAppState>
  ) {}

  ngOnInit() {}

  close() {
    this.bottomSheetRef.dismiss();
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
