import { PROFILE_IMAGES } from "../../../../constants";
import { docClient } from "../../../../instances/aws";

export const dynamodbStoreUploadedProfileImageInformation = (imageInfo: any) =>
  docClient
    .put({
      TableName: PROFILE_IMAGES,
      Item: imageInfo,
    })
    .promise()
    .then((res) => res);
