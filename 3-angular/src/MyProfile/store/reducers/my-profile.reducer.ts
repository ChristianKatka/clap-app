import { InitActions } from '@app/store/actions';
import { createReducer, on, Action } from '@ngrx/store';
import { MyProfile } from '@shared/models/my-profile.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';

export interface MyProfileState {
  myProfile: MyProfile | undefined;
}

export const initialState: MyProfileState = {
  myProfile: undefined,
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

  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: MyProfileState | undefined, action: Action) =>
  PostsReducer(state, action);
