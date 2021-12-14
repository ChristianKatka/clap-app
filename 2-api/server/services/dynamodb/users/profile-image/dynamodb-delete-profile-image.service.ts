import { PROFILE_IMAGES_TABLE } from "../../../../constants";
import { docClient } from "../../../../instances/aws";

export const dynamodbDeleteProfileImage = async (imageId: string) => {
  return await docClient
    .delete({
      TableName: PROFILE_IMAGES_TABLE,
      Key: { id: imageId },
    })
    .promise();
};
