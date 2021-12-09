import { PROFILE_IMAGES } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetProfileImages = async () => {
  return await docClient
    .scan({
      TableName: PROFILE_IMAGES,
    })
    .promise()
    .then((res) => res.Items);
};
