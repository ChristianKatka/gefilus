import { CognitoUser } from 'amazon-cognito-identity-js';
import { from } from 'rxjs';
import { setCredentialsFromSession } from './set-credentials-from-session.util';

export const changePassword = (
  currentUser: CognitoUser,
  newPassword: string
) => {
  return from(
    new Promise((resolve, reject) => {
      currentUser.completeNewPasswordChallenge(newPassword, [], {
        onSuccess: (session) => {
          setCredentialsFromSession(session);
          resolve(currentUser);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    })
  );
};
