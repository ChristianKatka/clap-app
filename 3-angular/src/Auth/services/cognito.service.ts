import { Injectable } from '@angular/core';
declare let AWS: any;
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  IAuthenticationDetailsData,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignUpUserData } from '@auth/models/sign-up-user-data.model';
import { SignUpService } from './sign-up.service';
import { AuthenticateUserService } from './authenticate-user.service';
import { ModifyUserService } from './modify-user.service';
import { UserSessionService } from './user-session.service';
import { CognitoFunctionsService } from './cognito-functions.service';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private userPool: CognitoUserPool;
  private credentials: any;

  constructor(
    private signUpService: SignUpService,
    private authenticateUserService: AuthenticateUserService,
    private modifyUserService: ModifyUserService,
    private userSessionService: UserSessionService,
    private cognitoFunctionsService: CognitoFunctionsService
  ) {
    AWS.config.region = environment.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.cognito.identityPoolId,
    });
    this.userPool = new CognitoUserPool(environment.cognito.poolData);
  }

  //  USED TO CHECK OLD USER SESSION (store efect)
  public getCurrentUser(): Observable<CognitoUser | null> {
    return of(this.userPool.getCurrentUser());
  }

  //  USED BY ROUTING GUARDS
  public isSessionValid(): Observable<boolean> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser == null) {
      return of(false);
    } else {
      return this.userSessionService
        .getSession(currentUser)
        .pipe(map((session) => session.isValid()));
    }
  }

  public sendNewEmailConfirmationCode(userName: string): Observable<any> {
    const currentUser =
      this.cognitoFunctionsService.createLocalCognitoUser(userName);
    return this.cognitoFunctionsService.resendConfirmationCode(currentUser);
  }

  // login
  public authenticateUser(userName: string, password: string): Observable<any> {
    const currentUser =
      this.cognitoFunctionsService.createLocalCognitoUser(userName);

    const authenticationData: IAuthenticationDetailsData = {
      Username: userName,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return this.authenticateUserService.authenticateUser(
      currentUser,
      authenticationDetails
    );
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

  // sign in new password required. (User created from AWS console)
  public changePassword(newPassword: string): Observable<any> {
    const currentUser = this.userPool.getCurrentUser();

    if (!currentUser) {
      return of({ error: 'no user' });
    }
    return this.modifyUserService.changePassword(currentUser, newPassword);
  }

  //  email confirmation code inputted
  confirmRegistration(userName: string, code: string): Observable<any> {
    const currentUser =
      this.cognitoFunctionsService.createLocalCognitoUser(userName);

    return this.signUpService.confirmRegistration(currentUser, code);
  }
}
