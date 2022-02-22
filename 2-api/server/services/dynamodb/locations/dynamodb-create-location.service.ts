import { LOCATIONS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbCreateLocation = (postLocation: string) =>
  docClient
    .put({
      TableName: LOCATIONS_TABLE,
      Item: { postLocation },
    })
    .promise()
    .then((res) => res);
