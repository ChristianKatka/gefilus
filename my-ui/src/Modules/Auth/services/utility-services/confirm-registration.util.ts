import { CognitoUser } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

export const confirmRegistration = (currentUser: CognitoUser, code: string) => {
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
};
