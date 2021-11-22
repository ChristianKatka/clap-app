import { IMAGES_TABLE } from '../../constants';
import { docClient } from '../../instances/aws';

export const dynamodbGetImages = async () => {
  return await docClient
    .scan({
      TableName: IMAGES_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
