import { NOTIFICATIONS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbCreateNotification = (notification: any) =>
  docClient
    .put({
      TableName: NOTIFICATIONS_TABLE,
      Item: notification,
    })
    .promise()
    .then((res) => res);
