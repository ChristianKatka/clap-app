import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyProfileWithProfileImage } from '@shared/models/my-profile.model';
import { Observable } from 'rxjs';
import { MyProfileBottomSheetService } from './services/my-profile-bottom-sheet.service';
import { ProfileExtendedAppState } from './store/reducers';
import { MyProfileSelectors } from './store/selectors';

@Component({
  templateUrl: 'my-profile-feature.container.html',
})
export class MyProfileFeatureContainerComponent {
  links = [
    { label: 'Posts', path: ['posts'] },
    { label: 'Saved', path: ['saved'] },
  ];

  myProfileData$: Observable<MyProfileWithProfileImage> = this.store.select(
    MyProfileSelectors.getMyProfile
  );

  constructor(
    private myProfileBottomSheetService: MyProfileBottomSheetService,
    private store: Store<ProfileExtendedAppState>
  ) {}

  ngOnInit() {}

  onOpenEditProfileBottomSheet() {
    this.myProfileBottomSheetService.openEditProfileBottomSheet();
  }
}
