import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyProfileBottomSheetService } from './services/my-profile-bottom-sheet.service';
import { MyProfileExtendedAppState } from './store/reducers';
import { MyProfileSelectors } from './store/selectors';

@Component({
  templateUrl: 'my-profile-feature.container.html',
})
export class MyProfileFeatureContainerComponent {
  links = [
    { label: 'Posts', path: ['posts'] },
    { label: 'Saved', path: ['saved'] },
  ];

  myProfileData$ = this.store.select(MyProfileSelectors.getMyProfile);

  constructor(
    private myProfileBottomSheetService: MyProfileBottomSheetService,
    private store: Store<MyProfileExtendedAppState>
  ) {}

  ngOnInit() {}

  onOpenEditProfileBottomSheet() {
    this.myProfileBottomSheetService.openEditProfileBottomSheet();
  }
}
