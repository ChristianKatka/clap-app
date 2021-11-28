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
export class SignUpService {
  constructor() {}

  public signUp(
    userPool: CognitoUserPool,
    signUpUserData: SignUpUserData
  ): Observable<any> {
    console.log(signUpUserData);

    const userAttributes = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: signUpUserData.email,
      }),
      new CognitoUserAttribute({
        Name: 'nickname',
        Value: signUpUserData.nickname,
      }),
    ];

    const validationData: CognitoUserAttribute[] = [];

    return new Observable((o: any) => {
      userPool.signUp(
        signUpUserData.username,
        signUpUserData.password,
        userAttributes,
        validationData,
        (err: any, result: any) => {
          if (err) {
            o.error(err);
          } else {
            o.next(result);
            o.complete();
          }
        }
      );
    });
  }

  public confirmRegistration(currentUser: CognitoUser, code: string) {
    return new Observable((o: any) => {
      currentUser.confirmRegistration(code, true, (err: any, result: any) => {
        if (err) {
          o.error(err);
          console.log('confirmRegistration error:');
          console.log(err);
        } else {
          o.next(result);
          o.complete();
        }
      });
    });
  }
}
