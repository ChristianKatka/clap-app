
import { Injectable } from '@angular/core';
declare let AWS: any;
import {
  CognitoUser,
  CognitoUserSession,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserService {
  
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
        IdentityPoolId: environment.cognito.identityPoolId,
        Logins: logins,
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
          newPasswordRequired: (userAttributes, requiredAttributes) => {
            const response: any = { ...currentUser };
            response.challengeName = 'NEW_PASSWORD_REQUIRED';
            response.challengeParam = {
              userAttributes,
              requiredAttributes,
            };
            resolve(response);
          },
        });
      })
    );
  }
}
