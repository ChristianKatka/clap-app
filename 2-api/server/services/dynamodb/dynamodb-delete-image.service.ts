import { IMAGES_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbDeleteImage = async (imageId: string) => {
  return await docClient
    .delete({
      TableName: IMAGES_TABLE,
      Key: { id: imageId },
    })
    .promise();
};
