import { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { SignUpUserData } from '@auth/models/sign-up-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  public signUp(
    userPool: CognitoUserPool,
    signUpUserData: SignUpUserData
  ) {
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
