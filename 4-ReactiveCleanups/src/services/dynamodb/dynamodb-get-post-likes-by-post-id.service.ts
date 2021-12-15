import { docClient } from '../../instances/aws';
import { DYNAMODB_POSTS_LIKES, POST_ID_INDEX } from '../../constants';

export const dynamodbGetPostLikesByPostId = (postId: string) => {
  return docClient
    .query({
      TableName: DYNAMODB_POSTS_LIKES,
      IndexName: POST_ID_INDEX,
      KeyConditionExpression: 'postId = :postId',
      ExpressionAttributeValues: {
        ':postId': postId,
      },
    })
    .promise().then((res) => res.Items ? res.Items : []);
};
