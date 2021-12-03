import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthenticatedActions } from '@auth/store/actions';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: 'create-new-account-or-log-out-bottom-sheet.container.html',
  styleUrls: ['create-new-account-or-log-out-bottom-sheet.container.scss'],
})
export class CreateNewAccountOrLogOutBottomSheetContainerComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CreateNewAccountOrLogOutBottomSheetContainerComponent>,
    private store: Store<AuthExtendedAppState>
  ) {}

  ngOnInit() {}

  close() {
    this.bottomSheetRef.dismiss();
  }

  logOut() {
    this.close()
    this.store.dispatch(AuthenticatedActions.signOut());
  }
}
