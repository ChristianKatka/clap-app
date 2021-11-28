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
import { AuthenticateUserService } from './authenticate-user.service';

@Injectable({
  providedIn: 'root',
})
export class ModifyUserService {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  public changePassword(currentUser: CognitoUser, newPassword: string) {
    return from(
      new Promise((resolve, reject) => {
        currentUser.completeNewPasswordChallenge(newPassword, [], {
          onSuccess: (session) => {
            this.authenticateUserService.setCredentialsFromSession(session);
            resolve(currentUser);
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      })
    );
  }
}
