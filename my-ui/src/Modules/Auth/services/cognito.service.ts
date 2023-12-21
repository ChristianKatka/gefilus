import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  IAuthenticationDetailsData,
} from 'amazon-cognito-identity-js';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SignUpUserData } from '../models/sign-up-user-data.model';
import { getSession } from './utility-services/get-session.util';
import { createLocalCognitoUser } from './utility-services/create-local-cognito-user.util';
import { resendConfirmationCode } from './utility-services/resend-confirmation-code.util';
import { authenticateUser } from './utility-services/authenticate-user.util';
import { signUp } from './utility-services/sign-up-util';
import { changePassword } from './utility-services/change-password.util';
import { confirmRegistration } from './utility-services/confirm-registration.util';

declare let AWS: any;

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private userPool: CognitoUserPool;

  // Used to store locally logged in user data
  private cognitoUser: CognitoUser | null = null;

  constructor() {
    AWS.config.region = environment.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.cognito.identityPoolId,
    });
    this.userPool = new CognitoUserPool(environment.cognito.poolData);
  }

  // USED TO CHECK OLD USER SESSION
  getCurrentUser(): Observable<CognitoUser | null> {
    return of(this.userPool.getCurrentUser());
  }

  //  USED BY ROUTING GUARDS
  isSessionValid(): Observable<boolean> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser == null) {
      return of(false);
    } else {
      return getSession(currentUser).pipe(map((session) => session.isValid()));
    }
  }

  sendNewEmailConfirmationCode(userName: string): Observable<any> {
    const currentUser = createLocalCognitoUser(userName);
    return resendConfirmationCode(currentUser);
  }

  // login
  authenticateUser(userName: string, password: string): Observable<any> {
    const currentUser: CognitoUser = createLocalCognitoUser(userName);

    // Used to store locally logged in user data
    this.cognitoUser = currentUser;

    const authenticationData: IAuthenticationDetailsData = {
      Username: userName,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return authenticateUser(currentUser, authenticationDetails);
  }

  signUp(signUpUserData: SignUpUserData): Observable<any> {
    return signUp(this.userPool, signUpUserData);
  }

  signOut() {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.signOut();
    }
  }

  // sign in new password required. (User created from AWS console)
  changePassword(newPassword: string): Observable<any> {
    if (this.cognitoUser === null) {
      return of({ error: 'no user' });
    }
    return changePassword(this.cognitoUser, newPassword);
  }

  //  email confirmation code inputted
  confirmRegistrationByEmailCode(
    userName: string,
    code: string
  ): Observable<any> {
    const currentUser = createLocalCognitoUser(userName);

    return confirmRegistration(currentUser, code);
  }

  // USED BY AUTH HTTP
  getIdentityToken(): Observable<string> {
    const currentUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return of('Current user is null');
    }
    return getSession(currentUser).pipe(
      map((session) => session.getIdToken()),
      map((idToken) => idToken.getJwtToken())
    );
  }
}
