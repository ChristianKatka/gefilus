import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { environment } from '../../../../environments/environment';

declare let AWS: any;
export const setCredentialsFromSession = (session: CognitoUserSession) => {
  const token = session.getIdToken().getJwtToken();
  const key =
    'cognito-idp.' +
    environment.cognito.region +
    '.amazonaws.com/' +
    environment.cognito.poolData.UserPoolId;

  const logins: { [key: string]: string } = {};
  logins[key] = token;

  const credentials = new AWS.CognitoIdentityCredentials(
    {
      IdentityPoolId: environment.cognito.identityPoolId,
      Logins: logins,
    },
    {
      region: environment.cognito.region,
    }
  );

  return credentials;
};
