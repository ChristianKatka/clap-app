import { createSelector } from '@ngrx/store';
import { getMyProfileState } from '../reducers';

export const getMyProfile = createSelector(
  getMyProfileState,
  (state) => state.myProfile
);

export const getMyUserId = createSelector(
  getMyProfileState,
  (state) => state.myProfile?.id
);
