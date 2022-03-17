import { createSelector } from '@ngrx/store';
import { getCameraState } from '../reducers';

export const isCameraOpen = createSelector(
  getCameraState,
  (state) => state.isCameraOpen
);
