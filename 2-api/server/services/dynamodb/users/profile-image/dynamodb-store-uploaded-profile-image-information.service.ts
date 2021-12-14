import { PROFILE_IMAGES_TABLE } from "../../../../constants";
import { docClient } from "../../../../instances/aws";

export const dynamodbStoreUploadedProfileImageInformation = (imageInfo: any) =>
  docClient
    .put({
      TableName: PROFILE_IMAGES_TABLE,
      Item: imageInfo,
    })
    .promise()
    .then((res) => res);
