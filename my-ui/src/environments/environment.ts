// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
