import { docClient } from '../../instances/aws';
import { DYNAMODB_POSTS_COMMENTS, POST_ID_INDEX } from '../../constants';

export const dynamodbGetPostCommentsByPostId = (postId: string) => {
  return docClient
    .query({
      TableName: DYNAMODB_POSTS_COMMENTS,
      IndexName: POST_ID_INDEX,
      KeyConditionExpression: 'postId = :postId',
      ExpressionAttributeValues: {
        ':postId': postId,
      },
    })
    .promise().then((res) => res.Items ? res.Items : []);
};
