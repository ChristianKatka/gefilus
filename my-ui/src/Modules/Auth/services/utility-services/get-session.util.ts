import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

export const getSession = (
  currentUser: CognitoUser
): Observable<CognitoUserSession> => {
  return new Observable((o: any) => {
    currentUser.getSession((err: any, session: CognitoUserSession) => {
      if (err) {
        o.error(err);
      } else {
        o.next(session);
        o.complete();
      }
    });
  });
};
