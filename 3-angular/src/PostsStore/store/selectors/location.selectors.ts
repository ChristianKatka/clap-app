import { createSelector } from '@ngrx/store';
import { PostLocation } from '@shared/models/post-location.model';
import { getLocationsState } from '../reducers';

export const getSelectedPostLocation = createSelector(
  getLocationsState,
  (state) => state.selectedPostLocation
);
export const getSearchText = createSelector(
  getLocationsState,
  (state) => state.searchText
);

export const getPostLocations = createSelector(
  getLocationsState,
  getSearchText,
  getSelectedPostLocation,
  (state, searchText, selectedLocation) => {
    const locations = locationsWithSelectedInfoInside(
      Object.keys(state.postLocations),
      selectedLocation
    );

    if (searchText !== '') {
      const searchtext = searchText.trim().toLowerCase();
      const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(searchtext)
      );
      return filteredLocations;
    }
    return locations;
  }
);
const locationsWithSelectedInfoInside = (
  postLocations: string[],
  selectedLocation: string
): PostLocation[] =>
  postLocations.map((name) => {
    if (name === selectedLocation) {
      return { name, selected: true };
    }
    return { name, selected: false };
  });
