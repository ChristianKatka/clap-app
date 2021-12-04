import { POSTS_LIKES_TABLE } from "../../../../constants";
import { docClient } from "../../../../instances/aws";

export const dynamodbRemovePostLike = async (likeId: string) => {
  return await docClient
    .delete({
      TableName: POSTS_LIKES_TABLE,
      Key: { id: likeId },
    })
    .promise();
};

