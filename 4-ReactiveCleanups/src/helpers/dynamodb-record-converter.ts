import * as AWS from 'aws-sdk';

export const convertDynamoDBRecord = (data: any) => AWS.DynamoDB.Converter.unmarshall(data);