import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { ProfileImage } from '@shared/models/profile-image.models';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { ProfileImageActions } from '../actions';

export interface ProfileImageState {
  myProfileImage: ProfileImage | undefined;
  imageUploading:
    | undefined
    | {
        uploadProgress: number;
      };
  uploading: boolean;
}

export const initialState: ProfileImageState = {
  myProfileImage: undefined,
  imageUploading: undefined,
  uploading: false,
};

const ProfileImageReducer = createReducer(
  initialState,
  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { myProfileImage }) => {
      return {
        ...state,
        myProfileImage,
      };
    }
  ),

  on(ProfileImageActions.setUploadingProfileImage, (state, { file }) => ({
    ...state,
    uploading: true,
  })),

  on(
    ProfileImageActions.setUploadingProfileImageProgress,
    (state, { progress }) => {
      console.log(progress);

      return {
        ...state,
        imageUploading: { uploadProgress: progress },
      };
    }
  ),

  on(
    ProfileImageActions.storeUploadedProfileImageInformationToDBSuccess,
    (state, { image }) => ({
      ...state,
      imageUploading: undefined,
      myProfileImage: image,
      uploading: false,
    })
  ),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: ProfileImageState | undefined, action: Action) =>
  ProfileImageReducer(state, action);
