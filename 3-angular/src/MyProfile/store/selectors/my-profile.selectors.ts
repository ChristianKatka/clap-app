import { createSelector } from '@ngrx/store';
import { MyProfileWithProfileImage } from '@shared/models/my-profile.model';
import { getMyProfileState, getProfileImageState } from '../reducers';

export const isLoading = createSelector(
  getMyProfileState,
  (state) => state.loading
);

export const getMyProfile = createSelector(
  getMyProfileState,
  getProfileImageState,
  (profileState, imageState): MyProfileWithProfileImage => {
    if (!imageState.myProfileImage)
      return {
        ...profileState.myProfile,
        profileImageUrl: 'assets/images/default_profile_image.png',
      };

    return {
      ...profileState.myProfile,
      profileImageUrl: imageState.myProfileImage.imageUrl,
    };
  }
);

export const getMyProfileImage = createSelector(
  getMyProfile,
  (myProfile) => myProfile.profileImageUrl
);

export const getMyUserId = createSelector(
  getMyProfileState,
  (state) => state.myProfile?.id
);
export const getMyNickname = createSelector(
  getMyProfileState,
  (state) => state.myProfile?.nickname
);
