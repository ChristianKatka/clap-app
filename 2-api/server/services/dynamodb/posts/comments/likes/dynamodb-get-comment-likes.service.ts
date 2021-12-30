import {
  COMMENTS_LIKES_TABLE,
  COMMENT_ID_INDEX,
} from '../../../../../constants';
import { docClient } from '../../../../../instances/aws';

export const dynamodbGetCommentLikes = async (commentId: string) => {
  return await docClient
    .query({
      TableName: COMMENTS_LIKES_TABLE,
      IndexName: COMMENT_ID_INDEX,
      KeyConditionExpression: 'commentId = :commentId',
      ExpressionAttributeValues: {
        ':commentId': commentId,
      },
    })
    .promise()
    .then((res) => res.Items);
};
