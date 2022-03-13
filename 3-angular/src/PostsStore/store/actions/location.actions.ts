import { createAction, props } from '@ngrx/store';

export const selectLocation = createAction(
  '[Location] Select Location',
  props<{ location: string }>()
);
export const selectLocationSuccess = createAction(
  '[Location] Select Location Success',
  props<{ location: string }>()
);
export const selectLocationFailure = createAction(
  '[Location] Select Location Failure',
  props<{ error: string }>()
);

export const searchLocation = createAction(
  '[Location] Search Location',
  props<{ searchText: string }>()
);
