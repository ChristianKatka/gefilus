import { CognitoUser } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

export const resendConfirmationCode = (currentUser: CognitoUser) => {
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
};
