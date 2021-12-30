import { COMMENTS_LIKES_TABLE } from '../../../../../constants';
import { docClient } from '../../../../../instances/aws';

export const dynamodbRemoveCommentLike = async (likeId: string) => {
  return await docClient
    .delete({
      TableName: COMMENTS_LIKES_TABLE,
      Key: { id: likeId },
    })
    .promise();
};
