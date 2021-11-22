import { s3Client } from "../../instances/aws";
import { S3_UPLOAD_SIGNED_URL_EXPIRES } from "../../constants";

export const s3GetImageSignedUploadUrl = (filePath: string, mimeType: string, bucket: string) => {
  const signedUrlParams = {
    Bucket: bucket,
    Key: filePath,
    ContentType: mimeType,
    Expires: S3_UPLOAD_SIGNED_URL_EXPIRES,
  };

  return s3Client.getSignedUrl("putObject", signedUrlParams);
};
