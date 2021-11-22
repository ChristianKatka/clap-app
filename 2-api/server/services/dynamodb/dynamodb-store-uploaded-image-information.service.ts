import { IMAGES_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbStoreUploadedImageInformation = (imageInfo: any) =>
  docClient
    .put({
      TableName: IMAGES_TABLE,
      Item: imageInfo,
    })
    .promise()
    .then((res) => res);
