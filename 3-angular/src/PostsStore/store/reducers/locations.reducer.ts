import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticatedActions } from '../../../Auth/store/actions';

export interface LocationsState {
  postLocations: { [postLocation: string]: string };
}

export const initialState: LocationsState = {
  postLocations: {},
};

const LocationsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { postLocations }) => {
      return {
        ...state,
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

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: LocationsState | undefined, action: Action) =>
  LocationsReducer(state, action);
