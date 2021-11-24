export const environment = {
  production: true,
  apiBaseUrl: 'https://lwx2dwf5z5.execute-api.eu-west-1.amazonaws.com',
  cognito: {
    identityPoolId: 'eu-west-1:893f2177-ade3-48f6-a353-f297729679df',
    region: 'eu-west-1',
    poolData: {
      /* eslint-disable */
      UserPoolId: 'eu-west-1_iS1h5qUcn',
      ClientId: 'dfaskgnq12t12ajd0i12lvuo7',
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
