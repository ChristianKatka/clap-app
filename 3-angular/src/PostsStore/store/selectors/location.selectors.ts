import { createSelector } from '@ngrx/store';
import { getLocationsState } from '../reducers';

export const getPostLocations = createSelector(
  getLocationsState,
  (state) => state.postLocations
);
