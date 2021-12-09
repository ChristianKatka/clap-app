import { PROFILE_IMAGES } from "../../../../constants";
import { docClient } from "../../../../instances/aws";

export const dynamodbDeleteProfileImage = async (imageId: string) => {
  return await docClient
    .delete({
      TableName: PROFILE_IMAGES,
      Key: { id: imageId },
    })
    .promise();
};
