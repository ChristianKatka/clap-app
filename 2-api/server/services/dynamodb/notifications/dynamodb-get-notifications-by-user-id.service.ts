import { NOTIFICATIONS_TABLE, USER_ID_INDEX } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbGetNotificationsByUserId = async (userId: string) => {
  return await docClient
    .query({
      TableName: NOTIFICATIONS_TABLE,
      IndexName: USER_ID_INDEX,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    })
    .promise()
    .then((res) => res.Items);
};
