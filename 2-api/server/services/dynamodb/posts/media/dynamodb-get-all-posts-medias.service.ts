import { POSTS_MEDIAS_TABLE } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetAllPostsMedias = async () => {
  return await docClient
    .scan({
      TableName: POSTS_MEDIAS_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
