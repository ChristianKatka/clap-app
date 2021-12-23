import { createAction, props } from '@ngrx/store';
import { InitializeData } from '@shared/models/Initialize-data.model';

export const loadApplicationInitializeData = createAction(
  '[Init] Load Application Initialize Data'
);

export const loadApplicationInitializeDataSuccess = createAction(
  '[Init] Load Application Initialize Data Success',
  props<InitializeData>()
);

export const loadApplicationInitializeDataFailure = createAction(
  '[Init] Load Application Initialize Data Failure',
  props<{ error: string }>()
);
