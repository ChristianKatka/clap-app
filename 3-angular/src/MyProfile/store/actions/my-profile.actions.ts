import { createAction, props } from '@ngrx/store';
import { MyProfile } from '@shared/models/my-profile.model';

export const updateUserBio = createAction(
  '[MyProfile] Update User Bio',
  props<{ bio: string }>()
);
export const updateUserBioSuccess = createAction(
  '[MyProfile] Update User Bio Success',
  props<{ myProfile: MyProfile }>()
);
export const updateUserBioFailure = createAction(
  '[MyProfile] Update User Bio Failure',
  props<{ error: string }>()
);
