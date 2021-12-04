import { createAction, props } from '@ngrx/store';

// Load ALL
export const loadApplicationInitializeData = createAction(
  '[Init] Load Application Initialize Data'
);

export const loadApplicationInitializeDataSuccess = createAction(
  '[Init] Load Application Initialize Data Success',
  props<{ posts: any; likes: any }>()
);

export const loadApplicationInitializeDataFailure = createAction(
  '[Init] Load Application Initialize Data',
  props<{ error: string }>()
);
