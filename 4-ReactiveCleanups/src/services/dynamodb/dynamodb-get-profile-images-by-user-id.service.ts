import { docClient } from '../../instances/aws';
import { DYNAMODB_PROFILE_IMAGES_TABLE, USER_ID_INDEX } from '../../constants';

export const dynamodbGetProfileImagesByUserId = (userId: string) => {
  return docClient
    .query({
      TableName: DYNAMODB_PROFILE_IMAGES_TABLE,
      IndexName: USER_ID_INDEX,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    })
    .promise();
};
