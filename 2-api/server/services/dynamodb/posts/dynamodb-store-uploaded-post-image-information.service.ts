import { POSTS_IMAGES_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbStoreUploadedPostImageInformation = (imageInfo: any) =>
  docClient
    .put({
      TableName: POSTS_IMAGES_TABLE,
      Item: imageInfo,
    })
    .promise()
    .then((res) => res);
