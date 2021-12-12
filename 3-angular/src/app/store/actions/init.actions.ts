import { createAction, props } from '@ngrx/store';
import { InitializeData } from '@shared/models/Initialize-data.model';
import { MyProfile } from '@shared/models/my-profile.model';

// Load ALL
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
