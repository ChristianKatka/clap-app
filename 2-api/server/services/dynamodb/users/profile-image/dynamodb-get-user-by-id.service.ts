import { PROFILE_IMAGES, USER_ID_INDEX } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetUsersProfileImageById = async (userId: string) => {
  return await docClient
    .query({
      TableName: PROFILE_IMAGES,
      IndexName: USER_ID_INDEX,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    })
    .promise()
    .then((res) => res.Items ? res.Items[0]: undefined);
};
