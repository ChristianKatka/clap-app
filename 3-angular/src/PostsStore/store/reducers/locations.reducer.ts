import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { LocationActions } from '../actions';

export interface LocationsState {
  postLocations: { [postLocation: string]: string };
  selectedPostLocation: string;
  searchText: string;
}

export const initialState: LocationsState = {
  postLocations: {},
  selectedPostLocation: 'Jyväskylä',
  searchText: '',
};

const LocationsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { postLocations, myProfile }) => {
      return {
        ...state,
        selectedPostLocation: myProfile.selectedLocation,
        postLocations: postLocations.reduce(
          (items: { [postLocation: string]: any }, item: any) => ({
            ...items,
            [item.postLocation]: item,
          }),
          {}
        ),
      };
    }
  ),
  on(LocationActions.selectLocation, (state, { location }) => {
    return {
      ...state,
      selectedPostLocation: location,
    };
  }),
  on(LocationActions.searchLocation, (state, { searchText }) => {
    return {
      ...state,
      searchText,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: LocationsState | undefined, action: Action) =>
  LocationsReducer(state, action);
