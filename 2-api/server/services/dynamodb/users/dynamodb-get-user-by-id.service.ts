import { USERS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbGetUserById = async (userId: string) => {
  return await docClient
    .query({
      TableName: USERS_TABLE,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': userId,
      },
    })
    .promise()
    .then((res) => res.Items ? res.Items[0]: undefined);
};
