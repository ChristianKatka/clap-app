import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { MyProfile } from '@shared/models/my-profile.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { MyProfileActions } from '../actions';

export interface MyProfileState {
  myProfile: MyProfile;
  loading: boolean;
}

export const initialState: MyProfileState = {
  myProfile: {
    id: '',
    email: '',
    nickname: '',
    bio: '',
    selectedLocation: '',
  },
  loading: false,
};

const PostsReducer = createReducer(
  initialState,
  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { myProfile }) => {
      return {
        ...state,
        myProfile,
      };
    }
  ),
  on(MyProfileActions.updateUserBio, (state) => ({
    ...state,
    loading: true,
  })),
  on(MyProfileActions.updateUserBioSuccess, (state, { myProfile }) => {
    return {
      ...state,
      myProfile,
      loading: false,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: MyProfileState | undefined, action: Action) =>
  PostsReducer(state, action);
