import { createSelector } from '@ngrx/store';
import { getMyProfileState, getProfileImageState } from '../reducers';

export const isLoading = createSelector(
  getMyProfileState,
  (state) => state.loading
);

export const getMyProfile = createSelector(
  getMyProfileState,
  getProfileImageState,
  (profileState, imageState) => {
    if (!profileState.myProfile) return undefined;
    if (!imageState.myProfileImage) return undefined;
    if (!imageState.myProfileImage.imageUrl) return undefined;

    return {
      ...profileState.myProfile,
      profileImageUrl: imageState.myProfileImage.imageUrl,
    };
  }
);

export const getMyUserId = createSelector(
  getMyProfileState,
  (state) => state.myProfile?.id
);
