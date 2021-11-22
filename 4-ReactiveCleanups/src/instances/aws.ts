import * as AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
});

export const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export const s3Client = new AWS.S3();