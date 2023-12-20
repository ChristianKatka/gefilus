export const environment = {
  production: true,
  cognito: {
    identityPoolId: 'eu-west-1:8c05dd06-668c-4c07-97c1-4e4d286232ce',
    region: 'eu-west-1',
    poolData: {
      UserPoolId: 'eu-west-1_PPO2d1xPO',
      ClientId: '17tlmm8kddsg56oam8rd03tld6',
    },
    mandatorySignIn: true,
    cookieStorage: {
      domain: '',
      path: '/',
      expires: 30,
      secure: true,
    },
  },
};
