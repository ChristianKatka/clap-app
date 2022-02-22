import { LOCATIONS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbGetLocation = async (postLocation: string) => {
  return await docClient
    .query({
      TableName: LOCATIONS_TABLE,
      KeyConditionExpression: 'postLocation = :postLocation',
      ExpressionAttributeValues: {
        ':postLocation': postLocation,
      },
    })
    .promise()
    .then((res) => (res.Items ? res.Items[0] : undefined));
};
