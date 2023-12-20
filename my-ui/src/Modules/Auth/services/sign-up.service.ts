import { Injectable } from '@angular/core';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { SignUpUserData } from '../models/sign-up-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  signUp(userPool: CognitoUserPool, signUpUserData: SignUpUserData) {
    const userAttributes = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: signUpUserData.email,
      }),
      new CognitoUserAttribute({
        Name: 'nickname', // CANT SET USERNAME AT THE MOMENT NEED TO CONFIGURE IT IN THE COGNITO INSTANCE
        Value: signUpUserData.username,
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

  confirmRegistration(currentUser: CognitoUser, code: string) {
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
