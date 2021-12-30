import { COMMENTS_LIKES_TABLE } from '../../../../../constants';
import { docClient } from '../../../../../instances/aws';

export const dynamodbGetAllCommentsLikes = async () => {
  return await docClient
    .scan({
      TableName: COMMENTS_LIKES_TABLE,
    })
    .promise()
    .then((res) => res.Items);
};
