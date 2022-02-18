import { POSTS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbGetPostById = async (postId: string) => {
  return await docClient
    .query({
      TableName: POSTS_TABLE,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": postId,
      },
    })
    .promise()
    .then((res) => res.Items ? res.Items[0]: undefined);
};
