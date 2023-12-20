import { Injectable } from '@angular/core';
import { SignUpUserData } from '../models/sign-up-user-data.model';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  IAuthenticationDetailsData,
} from 'amazon-cognito-identity-js';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticateUserService } from './authenticate-user.service';
import { CognitoFunctionsService } from './cognito-functions.service';
import { ModifyUserService } from './modify-user.service';
import { SignUpService } from './sign-up.service';
import { UserSessionService } from './user-session.service';
declare let AWS: any;

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
      return this.userSessionService
        .getSession(currentUser)
        .pipe(map((session) => session.isValid()));
    }
  }

  sendNewEmailConfirmationCode(userName: string): Observable<any> {
    const currentUser =
      this.cognitoFunctionsService.createLocalCognitoUser(userName);
    return this.cognitoFunctionsService.resendConfirmationCode(currentUser);
  }

  // login
  authenticateUser(userName: string, password: string): Observable<any> {
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

  signUp(signUpUserData: SignUpUserData): Observable<any> {
    console.log('again:');
    console.log(signUpUserData);

    return this.signUpService.signUp(this.userPool, signUpUserData);
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
  getIdentityToken(): Observable<string> {
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
