import { POSTS_LIKES_TABLE } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetAllPostsLikes = async () => {
  return await docClient
    .scan({
      TableName: POSTS_LIKES_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
