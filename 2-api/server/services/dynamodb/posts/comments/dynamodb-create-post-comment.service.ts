import { POSTS_COMMENTS_TABLE } from "../../../../constants";
import { docClient } from "../../../../instances/aws";

export const dynamodbCreatePostComment = (post: any) =>
  docClient
    .put({
      TableName: POSTS_COMMENTS_TABLE,
      Item: post,
    })
    .promise()
    .then((res) => res);
