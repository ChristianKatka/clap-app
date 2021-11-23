import { createAction, props } from '@ngrx/store';
import {
  CognitoUserAttribute,
  ICognitoUserAttributeData,
} from 'amazon-cognito-identity-js';

export const updateUserAttributes = createAction(
  '[Cognito] Update User Attributes',
  props<{
    userAttributes: (CognitoUserAttribute | ICognitoUserAttributeData)[];
  }>()
);

export const updateUserAttributesSuccess = createAction(
  '[Cognito] Update User Attributes Success',
  props<{ result: any }>()
);

export const updateUserAttributesFailure = createAction(
  '[Cognito] Update User Attributes Failure',
  props<{ error: string }>()
);
