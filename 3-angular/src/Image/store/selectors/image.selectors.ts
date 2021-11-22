import { createSelector } from '@ngrx/store';
import { getImagesState } from '../reducers';

export const getUploadingFileInfo = createSelector(
  getImagesState,
  (state) => state.imageUploading
);

export const getImages = createSelector(getImagesState, (state) => {

  return Object.values(state.entities)[0];
});
