import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { CameraActions } from '../actions';

export interface CameraState {
  isCameraOpen: boolean;
}

export const initialState: CameraState = {
  isCameraOpen: false,
};

const CameraReducer = createReducer(
  initialState,

  on(CameraActions.openCamera, (state) => {
    return {
      ...state,
      isCameraOpen: true,
    };
  }),
  on(CameraActions.closeCamera, (state) => {
    return {
      ...state,
      isCameraOpen: false,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: CameraState | undefined, action: Action) =>
  CameraReducer(state, action);
