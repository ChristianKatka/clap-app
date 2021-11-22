import * as AWS from 'aws-sdk';
import * as bluebird from 'bluebird';

AWS.config.setPromisesDependency(bluebird);

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION
});

export const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
});
