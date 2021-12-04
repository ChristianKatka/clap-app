import { POSTS_TABLE } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetAllPostsLikes = async () => {
  return await docClient
    .scan({
      TableName: POSTS_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
