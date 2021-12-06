import { createSelector } from '@ngrx/store';
import { getMyProfileState } from '../reducers';

export const isLoading = createSelector(
  getMyProfileState,
  (state) => state.loading
);

export const getMyProfile = createSelector(
  getMyProfileState,
  (state) => state.myProfile
);

export const getMyUserId = createSelector(
  getMyProfileState,
  (state) => state.myProfile?.id
);
