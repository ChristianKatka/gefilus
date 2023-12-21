import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { from } from 'rxjs';
import { setCredentialsFromSession } from './set-credentials-from-session.util';

export const authenticateUser = (
  currentUser: CognitoUser,
  authenticationDetails: AuthenticationDetails
) => {
  return from(
    new Promise((resolve, reject) => {
      currentUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          setCredentialsFromSession(session);
          resolve(currentUser);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          const response: any = { ...currentUser };
          response.challengeName = 'NEW_PASSWORD_REQUIRED';
          response.challengeParam = {
            userAttributes,
            requiredAttributes,
          };
          resolve(response);
        },
      });
    })
  );
};
