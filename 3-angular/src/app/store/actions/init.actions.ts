import { createAction, props } from '@ngrx/store';

// Load ALL
export const loadApplicationInitializingData = createAction(
  '[Init] Load Application Initializing Data'
);

export const loadApplicationInitializingDataSuccess = createAction(
  '[Init] Load Application Initializing Data Success',
  props<{ data: any }>()
);

export const loadApplicationInitializingDataFailure = createAction(
  '[Init] Load Application Initializing Data',
  props<{ error: string }>()
);
