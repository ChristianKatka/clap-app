import { createSelector } from '@ngrx/store';
import { getProfileImageState } from '../reducers';

export const getUploadingFileInfo = createSelector(
  getProfileImageState,
  (state) => state.imageUploading
);

export const isUploading = createSelector(
  getProfileImageState,
  (state) => state.uploading
);
