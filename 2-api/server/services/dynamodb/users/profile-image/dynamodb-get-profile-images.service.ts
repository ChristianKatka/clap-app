import { PROFILE_IMAGES_TABLE } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetProfileImages = async () => {
  return await docClient
    .scan({
      TableName: PROFILE_IMAGES_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
