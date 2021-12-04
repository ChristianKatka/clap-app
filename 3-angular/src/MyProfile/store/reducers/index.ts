import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';
import * as fromMyProfile from './my-profile.reducer';
import { AppState } from '../../../app/store/reducers';


export const featureKey = 'myProfile';
export interface MyProfileFeatureState {
  myProfile: fromMyProfile.MyProfileState;
}

export interface MyProfileExtendedAppState extends AppState {
  myProfile: MyProfileFeatureState;
}

export const reducers: ActionReducerMap<MyProfileFeatureState> = {
  myProfile: fromMyProfile.reducer,
};

const getMyProfileFeatureState =
  createFeatureSelector<MyProfileFeatureState>(featureKey);

export const getMyProfile = createFeatureSelector<fromMyProfile.MyProfileState>('myProfile');
export const getMyProfileState = createSelector(getMyProfileFeatureState, getMyProfile);
