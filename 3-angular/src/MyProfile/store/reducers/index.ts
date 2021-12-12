import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';
import * as fromMyProfile from './my-profile.reducer';
import * as fromProfileImage from './profile-image.reducer';
import { AppState } from '../../../app/store/reducers';

export const featureKey = 'profile';
export interface ProfileFeatureState {
  myProfile: fromMyProfile.MyProfileState;
  profileImage: fromProfileImage.ProfileImageState;
}

export interface ProfileExtendedAppState extends AppState {
  profile: ProfileFeatureState;
}

export const reducers: ActionReducerMap<ProfileFeatureState> = {
  myProfile: fromMyProfile.reducer,
  profileImage: fromProfileImage.reducer,
};

const getProfileFeatureState =
  createFeatureSelector<ProfileFeatureState>(featureKey);

const getMyProfile =
  createFeatureSelector<fromMyProfile.MyProfileState>('myProfile');
export const getMyProfileState = createSelector(
  getProfileFeatureState,
  getMyProfile
);

const getProfileImage =
  createFeatureSelector<fromProfileImage.ProfileImageState>('profileImage');
export const getProfileImageState = createSelector(
  getProfileFeatureState,
  getProfileImage
);
