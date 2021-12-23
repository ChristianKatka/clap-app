import { POSTS_MEDIAS_TABLE } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbStorePostMedia = (postMedia: any) =>
  docClient
    .put({
      TableName: POSTS_MEDIAS_TABLE,
      Item: postMedia,
    })
    .promise()
    .then((res) => res);
