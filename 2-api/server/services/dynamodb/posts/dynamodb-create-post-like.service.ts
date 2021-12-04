import { POSTS_LIKES_TABLE } from "../../../constants";
import { docClient } from "../../../instances/aws";

export const dynamodbCreatePostLike = (post: any) =>
  docClient
    .put({
      TableName: POSTS_LIKES_TABLE,
      Item: post,
    })
    .promise()
    .then((res) => res);
