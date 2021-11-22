import * as AWS from "aws-sdk";


// kun ajetaan pilveen EI KÄYTETÄ PROFIILIA.
if (process.env.NODE_ENV === "development") {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "krisuiam",
  });
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
  });
}

AWS.config.update({
  region: "eu-west-1",
});

export const docClient = new AWS.DynamoDB.DocumentClient();
export const s3Client = new AWS.S3();
