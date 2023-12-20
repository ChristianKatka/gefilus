import { Injectable } from '@angular/core';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CognitoFunctionsService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool(environment.cognito.poolData);
  }

  createLocalCognitoUser(userName: string): CognitoUser {
    const userData = {
      Username: userName,
      Pool: this.userPool,
    };

    return new CognitoUser(userData);
  }

  resendConfirmationCode(currentUser: CognitoUser) {
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
