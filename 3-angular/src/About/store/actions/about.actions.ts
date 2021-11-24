import { createAction } from '@ngrx/store';

export const showTermsOfService = createAction('[About] Show Terms of Service');

export const closeTermsOfService = createAction(
  '[About] Close Terms of Service'
);

export const showPrivacyPolicy = createAction('[About] Show Privacy Policy');

export const closePrivacyPolicy = createAction('[About] Close Privacy Policy');
