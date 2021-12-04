import { createAction, props } from '@ngrx/store';
import { MyProfile } from '@shared/models/my-profile.model';

// Load ALL
export const loadApplicationInitializeData = createAction(
  '[Init] Load Application Initialize Data'
);

export const loadApplicationInitializeDataSuccess = createAction(
  '[Init] Load Application Initialize Data Success',
  props<{ posts: any; myProfile: MyProfile }>()
);

export const loadApplicationInitializeDataFailure = createAction(
  '[Init] Load Application Initialize Data Failure',
  props<{ error: string }>()
);
