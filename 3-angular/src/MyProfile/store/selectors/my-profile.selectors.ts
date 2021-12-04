import { createSelector } from '@ngrx/store';
import { getMyProfileState } from '../reducers';

export const getMyProfile = createSelector(
  getMyProfileState,
  (state) => state.myProfile
);
