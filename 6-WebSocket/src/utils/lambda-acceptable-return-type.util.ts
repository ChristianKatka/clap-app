export const lambdaAcceptableReturnTypeUtil = (s: string) => {
  console.log(s);

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: s,
    }),
  };
};
