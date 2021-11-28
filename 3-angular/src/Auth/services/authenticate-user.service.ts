import { Injectable } from '@angular/core';
import { isNil } from 'lodash-es';

declare let AWS: any;
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession,
  AuthenticationDetails,
  UserData,
  ICognitoUserAttributeData,
} from 'amazon-cognito-identity-js';

import { environment } from '../../environments/environment';
import { Observable, from, of, throwError } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { isObject } from 'lodash-es';
import { SignUpUserData } from '@auth/models/sign-up-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserService {
  constructor() {}

  public setCredentialsFromSession(session: CognitoUserSession) {
    const token = session.getIdToken().getJwtToken();
    const key =
      'cognito-idp.' +
      environment.cognito.region +
      '.amazonaws.com/' +
      environment.cognito.poolData.UserPoolId;

    const logins: { [key: string]: string } = {};
    logins[key] = token;

    const credentials = new AWS.CognitoIdentityCredentials(
      {
        /* eslint-disable */
        IdentityPoolId: environment.cognito.identityPoolId,
        Logins: logins,
        /* eslint-enable */
      },
      {
        region: environment.cognito.region,
      }
    );

    return credentials;
  }

  public authenticateUser(
    currentUser: CognitoUser,
    authenticationDetails: AuthenticationDetails
  ) {
    return from(
      new Promise((resolve, reject) => {
        currentUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            this.setCredentialsFromSession(session);
            resolve(currentUser);
          },
          onFailure: (err) => {
            reject(err);
          },
          // mfaRequired: (challengeName, challengeParam) => {
          //   const response: any = { ...user };
          //   response.challengeName = challengeName;
          //   response.challengeParam = challengeParam;
          //   resolve(response);
          // },
          newPasswordRequired: (userAttributes, requiredAttributes) => {
            const response: any = { ...currentUser };
            response.challengeName = 'NEW_PASSWORD_REQUIRED';
            response.challengeParam = {
              userAttributes,
              requiredAttributes,
            };
            resolve(response);
          },
          // mfaSetup: (challengeName, challengeParam) => {
          //   const response: any = { ...user };
          //   response.challengeName = challengeName;
          //   response.challengeParam = challengeParam;
          //   resolve(response);
          // },
          // totpRequired: (challengeName, challengeParam) => {
          //   const response: any = { ...user };
          //   response.challengeName = challengeName;
          //   response.challengeParam = challengeParam;
          //   resolve(response);
          // },
          // selectMFAType: (challengeName, challengeParam) => {
          //   const response: any = { ...user };
          //   response.challengeName = challengeName;
          //   response.challengeParam = challengeParam;
          //   resolve(response);
          // },
        });
      })
    );
  }
}
