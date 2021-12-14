import { POSTS_COMMENTS_TABLE } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetAllPostsComments = async () => {
  return await docClient
    .scan({
      TableName: POSTS_COMMENTS_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
