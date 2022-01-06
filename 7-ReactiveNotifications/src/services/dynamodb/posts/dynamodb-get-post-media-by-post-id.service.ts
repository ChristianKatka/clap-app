import { POSTS_MEDIAS_TABLE, POST_ID_INDEX } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbGetPostMediaByPostId = async (postId: string) => {
  return await docClient
    .query({
      TableName: POSTS_MEDIAS_TABLE,
      IndexName: POST_ID_INDEX,
      KeyConditionExpression: 'postId = :postId',
      ExpressionAttributeValues: {
        ':postId': postId,
      },
    })
    .promise()
    .then((res) => (res.Items ? res.Items[0] : undefined));
};
