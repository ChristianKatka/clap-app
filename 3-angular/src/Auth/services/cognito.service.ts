import { Injectable } from '@angular/core';
declare let AWS: any;
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  IAuthenticationDetailsData,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
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

  // Used to store locally logged in user data
  private cognitoUser: CognitoUser | null = null;

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
    const currentUser: CognitoUser =
      this.cognitoFunctionsService.createLocalCognitoUser(userName);

    // Used to store locally logged in user data
    this.cognitoUser = currentUser;

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
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.signOut();
    }
  }

  // sign in new password required. (User created from AWS console)
  public changePassword(newPassword: string): Observable<any> {
    if (this.cognitoUser === null) {
      return of({ error: 'no user' });
    }
    return this.modifyUserService.changePassword(this.cognitoUser, newPassword);
  }

  //  email confirmation code inputted
  confirmRegistrationByEmailCode(
    userName: string,
    code: string
  ): Observable<any> {
    const currentUser =
      this.cognitoFunctionsService.createLocalCognitoUser(userName);

    return this.signUpService.confirmRegistration(currentUser, code);
  }

  // USED BY AUTH HTTP
  public getIdentityToken(): Observable<string> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return of('Current user is null');
    }
    return this.userSessionService.getSession(currentUser).pipe(
      map((session) => session.getIdToken()),
      map((idToken) => idToken.getJwtToken())
    );
  }
}
