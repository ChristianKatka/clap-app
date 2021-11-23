import { createAction, props } from '@ngrx/store';

export const setInitialUrl = createAction(
  '[Auth] Set Initial Url',
  props<{ initialUrl: string }>()
);

export const redirectToInitialUrl = createAction(
  '[Auth] Redirect To Initial Url',
  props<{ initialUrl: string }>()
);
