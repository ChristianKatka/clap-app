import { from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { S3_IMAGES_BUCKET } from '../../constants';
import { s3Client } from '../../instances/aws';

export const s3GetObject = (oldImage: any) => {
  const params = {
    Bucket: S3_IMAGES_BUCKET,
    Prefix: oldImage.s3Key,
  };
  return from(s3Client.listObjectsV2(params).promise()).pipe(
    map((response) => response.Contents),
    map((contents) => (contents ? contents.map((content) => content.Key) : [])),
    concatMap((s3ObjectKeys) => s3ObjectKeys)
  );
};
