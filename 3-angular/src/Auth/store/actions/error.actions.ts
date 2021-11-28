import { createAction, props } from '@ngrx/store';

export const signInUserNameDoesntExist = createAction(
  '[Auth] Sign In User Name Doesnt Exist',
  props<{ error: string }>()
);

