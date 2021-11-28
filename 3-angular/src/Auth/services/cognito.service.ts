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
import { SignUpService } from './sign-up.service';
import { AuthenticateUserService } from './authenticate-user.service';
import { ModifyUserService } from './modify-user.service';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private userPool: CognitoUserPool;
  private user: CognitoUser | null = null;
  private credentials: any;

  constructor(
    private signUpService: SignUpService,
    private authenticateUserService: AuthenticateUserService,
    private modifyUserService: ModifyUserService
  ) {
    AWS.config.region = environment.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.cognito.identityPoolId, // eslint-disable-line
    });
    this.userPool = new CognitoUserPool(environment.cognito.poolData);
  }

  public getCurrentUser(): Observable<CognitoUser | null> {
    return of(this.userPool.getCurrentUser());
  }

  public getCurrentUserData(): Observable<UserData> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return throwError('Current user is null');
    }

    return new Observable((o: any) => {
      currentUser.getUserData((err: any, result: any) => {
        if (err) {
          o.error(err);
        } else {
          o.next(result);
          o.complete();
        }
      });
    });
  }

  public getCurrentUserAttributes(): Observable<CognitoUserAttribute[]> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return throwError('Current user is null');
    }

    return new Observable((o: any) => {
      currentUser.getUserAttributes((err: any, result: any) => {
        if (err) {
          o.error(err);
        } else {
          o.next(result);
          o.complete();
        }
      });
    });
  }

  public getSession(cognitoUser: CognitoUser): Observable<CognitoUserSession> {
    const cognitoService = this;

    return new Observable((o: any) => {
      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          o.error(err);
        } else {
          o.next(session);
          o.complete();
        }
      });
    });
  }

  public getAccessToken(): Observable<string> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return throwError('Current user is null');
    }

    return this.getSession(currentUser).pipe(
      map((session) => session.getAccessToken()),
      map((accessToken) => accessToken.getJwtToken())
    );
  }

  public getIdentityToken(): Observable<string> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return throwError('Current user is null');
    }

    return this.getSession(currentUser).pipe(
      map((session) => session.getIdToken()),
      map((idToken) => idToken.getJwtToken())
    );
  }

  public isSessionValid(): Observable<boolean> {
    const user = this.userPool.getCurrentUser();

    if (user == null) {
      return of(false);
    } else {
      return this.getSession(user).pipe(map((session) => session.isValid()));
    }
  }

  public requestChangePasswordCode(username: string): Observable<any> {
    const userData = {
      /* eslint-disable */
      Username: username,
      Pool: this.userPool,
      /* eslint-enable */
    };

    const user = new CognitoUser(userData);
    return from(
      new Promise((resolve, reject) => {
        user.forgotPassword({
          onSuccess: () => {
            resolve('new-password-code-requested');
          },
          onFailure: (err) => {
            reject(err);
          },
          inputVerificationCode: (foo) => {
            resolve('password-change');
          },
        });
      })
    );
  }

  public confirmPassword(
    userName: string,
    code: string,
    password: string
  ): Observable<any> {
    const userData = {
      /* eslint-disable */
      Username: userName,
      Pool: this.userPool,
      /* eslint-enable */
    };

    const user = new CognitoUser(userData);
    this.user = user;

    return from(
      new Promise((resolve, reject) => {
        user.confirmPassword(code, password, {
          onSuccess: () => {
            resolve('password-confirmed');
          },

          onFailure: (err) => {
            console.log(
              'Failed to confirm password: ' + JSON.stringify(err, null, 4)
            );

            reject(err);
          },
        });
      })
    );
  }

  public authenticateUser(
    userName: string,
    password: string,
    validationData?: { [key: string]: any }
  ): Observable<any> {
    const userData = {
      Username: userName,
      Pool: this.userPool,
    };
    const currentUser = new CognitoUser(userData);
    this.user = currentUser;

    const authenticationData = {
      Username: userName,
      Password: password,
      ValidationData: isObject(validationData) ? validationData : undefined,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return this.authenticateUserService.authenticateUser(
      currentUser,
      authenticationDetails
    );

    // return from(
    //   new Promise((resolve, reject) => {
    //     user.authenticateUser(athenticationDetails, {
    //       onSuccess: (session) => {
    //         that.setCredentialsFromSession(session);
    //         that.user = user;
    //         resolve(user);
    //       },
    //       onFailure: (err) => {
    //         reject(err);
    //       },
    //       mfaRequired: (challengeName, challengeParam) => {
    //         const response: any = { ...user };
    //         response.challengeName = challengeName;
    //         response.challengeParam = challengeParam;
    //         resolve(response);
    //       },
    //       newPasswordRequired: (userAttributes, requiredAttributes) => {
    //         that.user = user;
    //         const response: any = { ...user };
    //         response.challengeName = 'NEW_PASSWORD_REQUIRED';
    //         response.challengeParam = {
    //           userAttributes,
    //           requiredAttributes,
    //         };
    //         resolve(response);
    //       },
    //       mfaSetup: (challengeName, challengeParam) => {
    //         const response: any = { ...user };
    //         response.challengeName = challengeName;
    //         response.challengeParam = challengeParam;
    //         resolve(response);
    //       },
    //       totpRequired: (challengeName, challengeParam) => {
    //         const response: any = { ...user };
    //         response.challengeName = challengeName;
    //         response.challengeParam = challengeParam;
    //         resolve(response);
    //       },
    //       selectMFAType: (challengeName, challengeParam) => {
    //         const response: any = { ...user };
    //         response.challengeName = challengeName;
    //         response.challengeParam = challengeParam;
    //         resolve(response);
    //       },
    //     });
    //   })
    // );
  }

  public resendVerificationCode(userName: string): Observable<any> {
    const userData = {
      /* eslint-disable */
      Username: userName,
      Pool: this.userPool,
      /* eslint-enable */
    };

    const user = new CognitoUser(userData);
    this.user = user;

    return new Observable((o: any) => {
      user.resendConfirmationCode((err: any, result: any) => {
        if (err) {
          o.error(err);
        } else {
          o.next(result);
          o.complete();
        }
      });
    });
  }

  public signUp(signUpUserData: SignUpUserData): Observable<any> {
    return this.signUpService.signUp(this.userPool, signUpUserData);
  }

  public signOut() {
    if (this.credentials) {
      this.credentials.clearCachedId();
    }

    const currentUser = this.userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.signOut();
    }
  }

  public forgotPassword(username: string, callbacks: any) {
    const userData = {
      /* eslint-disable */
      Username: username,
      Pool: this.userPool,
      /* eslint-enable */
    };

    this.user = new CognitoUser(userData);
    this.user.forgotPassword(callbacks);
  }

  public changePassword(newPassword: string): Observable<any> {
    let currentUser = this.userPool.getCurrentUser();

    if (isNil(currentUser)) {
      currentUser = this.user;
    }

    if (!currentUser) {
      return of({ error: 'no user' });
    }
    return this.modifyUserService.changePassword(currentUser, newPassword);

    // return from(
    //   new Promise((resolve, reject) => {
    //     if (user === null) {
    //       reject('Current user is null');
    //     } else {
    //       user.completeNewPasswordChallenge(newPassword, [], {
    //         onSuccess: (session) => {
    //           that.setCredentialsFromSession(session);
    //           that.user = user;
    //           resolve(user);
    //         },
    //         onFailure: (err) => {
    //           reject(err);
    //         },
    //         mfaRequired: (challengeName, challengeParam) => {
    //           const response: any = { ...user };
    //           response.challengeName = challengeName;
    //           response.challengeParam = challengeParam;
    //           resolve(response);
    //         },
    //       });
    //     }
    //   })
    // );
  }

  public updateUserAttributes(
    attributes: (CognitoUserAttribute | ICognitoUserAttributeData)[]
  ): Observable<any> {
    let user = this.userPool.getCurrentUser();

    console.log(user);

    if (isNil(user)) {
      user = this.user;
    }

    if (user === null) {
      return throwError('Current user is null');
    }

    return this.getSession(user).pipe(
      concatMap(
        (session) =>
          new Observable((o: any) => {
            if (user) {
              user.updateAttributes(attributes, (err: any, result: any) => {
                if (err) {
                  console.log(err);
                  o.error(err);
                } else {
                  o.next(result);
                  o.complete();
                }
              });
            }
          })
      )
    );
  }

  confirmRegistration(userName: string, code: string): Observable<any> {
    console.log(userName);
    console.log(code);

    const userData = {
      Username: userName,
      Pool: this.userPool,
    };
    const currentUser = new CognitoUser(userData);
    this.user = currentUser;

    return this.signUpService.confirmRegistration(currentUser, code);

    // const userData = {
    //   /* eslint-disable */
    //   Username: userName,
    //   Pool: this.userPool,
    //   /* eslint-enable */
    // };
    // console.log(userData);

    // const currentUser = new CognitoUser(userData);
    // this.user = currentUser;
    // console.log(currentUser);

    // return new Observable((o: any) => {
    //   currentUser.confirmRegistration(code, true, (err: any, result: any) => {
    //     if (err) {
    //       o.error(err);
    //       console.log('confirmRegistration error:');
    //       console.log(err);
    //     } else {
    //       o.next(result);
    //       o.complete();
    //     }
    //   });
    // });
  }

  private setCredentialsFromSession(session: CognitoUserSession) {
    this.credentials =
      this.authenticateUserService.setCredentialsFromSession(session);
    this.credentials.authenticated = true;

    // const token = session.getIdToken().getJwtToken();
    // const key =
    //   'cognito-idp.' +
    //   environment.cognito.region +
    //   '.amazonaws.com/' +
    //   environment.cognito.poolData.UserPoolId;

    // const logins: { [key: string]: string } = {};
    // logins[key] = token;

    // this.credentials = new AWS.CognitoIdentityCredentials(
    //   {
    //     /* eslint-disable */
    //     IdentityPoolId: environment.cognito.identityPoolId,
    //     Logins: logins,
    //     /* eslint-enable */
    //   },
    //   {
    //     region: environment.cognito.region,
    //   }
    // );
    // this.credentials.authenticated = true;
  }
}
