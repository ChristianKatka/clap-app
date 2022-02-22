import { LOCATIONS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamoDbGetLocations = async () => {
  return await docClient
    .scan({
      TableName: LOCATIONS_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
