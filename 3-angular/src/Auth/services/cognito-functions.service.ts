import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CognitoFunctionsService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool(environment.cognito.poolData);
  }

  public createLocalCognitoUser(userName: string): CognitoUser {
    const userData = {
      Username: userName,
      Pool: this.userPool,
    };

    return new CognitoUser(userData);
  }

  public resendConfirmationCode(currentUser: CognitoUser) {
    
    return new Observable((o: any) => {
      currentUser.resendConfirmationCode((err: any, result: any) => {
        if (err) {
          o.error(err);
        } else {
          o.next(result);
          o.complete();
        }
      });
    });
  }
}
