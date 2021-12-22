import { InitActions } from '@app/store/actions';
import { createReducer, on, Action } from '@ngrx/store';
import { MyProfile } from '@shared/models/my-profile.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { MyProfileActions } from '../actions';

export interface MyProfileState {
  myProfile: MyProfile | undefined;
  loading: boolean;
}

export const initialState: MyProfileState = {
  myProfile: undefined,
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
