import * as AWS from "aws-sdk";

export const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});
