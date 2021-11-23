export const environment = {
  production: true,
  apiBaseUrl: 'https://lwx2dwf5z5.execute-api.eu-west-1.amazonaws.com',
  cognito: {
    identityPoolId: 'eu-west-1:28e6a409-13a4-4db2-adbb-1b4275eb9f2a',
    region: 'eu-west-1',
    poolData: {
      /* eslint-disable */
      UserPoolId: 'eu-west-1_4bKx6pbAi',
      ClientId: '2l5iv33tbqho12iodt25rf40l7',
      /* eslint-enable */
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
