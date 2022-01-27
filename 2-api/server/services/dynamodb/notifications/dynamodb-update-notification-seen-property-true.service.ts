import { NOTIFICATIONS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbUpdateNotificationSeenPropertyTrue = (
  notificationId: string
): Promise<any> => {
  const params = {
    TableName: NOTIFICATIONS_TABLE,
    Key: {
      id: notificationId,
    },
    UpdateExpression: 'SET seen = :seen',
    ExpressionAttributeValues: {
      ':seen': true,
    },
  };
  return docClient.update(params).promise();
};
