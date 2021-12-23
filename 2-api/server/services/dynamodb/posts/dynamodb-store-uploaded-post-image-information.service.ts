import { POSTS_MEDIAS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbStoreUploadedPostImageInformation = (imageInfo: any) =>
  docClient
    .put({
      TableName: POSTS_MEDIAS_TABLE,
      Item: imageInfo,
    })
    .promise()
    .then((res) => res);
