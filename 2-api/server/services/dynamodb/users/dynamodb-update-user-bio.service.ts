import { USERS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbUpdateUserBio = (userId: string, bio: string) =>
  docClient
    .update({
      TableName: USERS_TABLE,
      Key: {
        id: userId,
      },
      UpdateExpression: 'SET bio = :bio',
      ExpressionAttributeValues: {
        ':bio': bio,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise()
    .then((response) =>
      response.Attributes ? response.Attributes : undefined
    );
