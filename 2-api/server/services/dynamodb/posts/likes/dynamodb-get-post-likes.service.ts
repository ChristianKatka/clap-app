import { POSTS_LIKES_TABLE, POST_ID_INDEX } from '../../../../constants';
import { docClient } from '../../../../instances/aws';

export const dynamodbGetPostLikes = async (postId: string) => {
  return await docClient
    .query({
      TableName: POSTS_LIKES_TABLE,
      IndexName: POST_ID_INDEX,
      KeyConditionExpression: 'postId = :postId',
      ExpressionAttributeValues: {
        ':postId': postId,
      },
    })
    .promise()
    .then((res) => res.Items);
};
