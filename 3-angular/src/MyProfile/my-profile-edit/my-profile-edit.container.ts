import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { MyProfileActions } from '../store/actions';
import { MyProfileExtendedAppState } from '../store/reducers';
import { MyProfileSelectors } from '../store/selectors';

@Component({
  templateUrl: 'my-profile-edit.container.html',
  styleUrls: ['my-profile-edit.container.scss'],
})
export class MyProfileEditContainerComponent implements OnInit {
  loading$ = this.store.select(MyProfileSelectors.isLoading);
  myProfileData$ = this.store.select(MyProfileSelectors.getMyProfile);

  constructor(
    private bottomSheetRef: MatBottomSheetRef<MyProfileEditContainerComponent>,
    private store: Store<MyProfileExtendedAppState>
  ) {}

  ngOnInit() {}

  onAddBio(bio: string) {
    this.store.dispatch(MyProfileActions.updateUserBio({ bio }));
  }

  onCloseBottomSheet() {
    this.bottomSheetRef.dismiss();
  }
}
