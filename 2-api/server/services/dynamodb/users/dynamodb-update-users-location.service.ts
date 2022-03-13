import { USERS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbUpdateUsersSelectedLocation = (userId: string, selectedLocation: string) =>
  docClient
    .update({
      TableName: USERS_TABLE,
      Key: {
        id: userId,
      },
      UpdateExpression: 'SET selectedLocation = :selectedLocation',
      ExpressionAttributeValues: {
        ':selectedLocation': selectedLocation,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise()
    .then((response) =>
      response.Attributes ? response.Attributes : undefined
    );
