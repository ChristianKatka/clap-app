import { POSTS_TABLE } from "../../../constants";
import { docClient } from "../../../instances/aws";

export const dynamodbCreatePost = (post: any) =>
  docClient
    .put({
      TableName: POSTS_TABLE,
      Item: post,
    })
    .promise()
    .then((res) => res);
