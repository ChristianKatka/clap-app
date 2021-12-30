import { COMMENTS_LIKES_TABLE } from '../../../../../constants';
import { docClient } from '../../../../../instances/aws';

export const dynamodbCreateCommentLike = (post: any) =>
  docClient
    .put({
      TableName: COMMENTS_LIKES_TABLE,
      Item: post,
    })
    .promise()
    .then((res) => res);
