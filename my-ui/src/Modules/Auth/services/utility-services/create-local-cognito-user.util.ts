import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../../../environments/environment';

export const createLocalCognitoUser = (userName: string): CognitoUser => {
  const userPool: CognitoUserPool = new CognitoUserPool(
    environment.cognito.poolData
  );

  const userData = {
    Username: userName,
    Pool: userPool,
  };

  return new CognitoUser(userData);
};
