import { Injectable } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { from } from 'rxjs';
import { AuthenticateUserService } from './authenticate-user.service';

@Injectable({
  providedIn: 'root',
})
export class ModifyUserService {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  changePassword(currentUser: CognitoUser, newPassword: string) {
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
