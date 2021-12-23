import { from, of } from 'rxjs';
import { S3_MEDIAS_BUCKET } from '../../constants';
import { s3Client } from '../../instances/aws';

export const s3DeleteObject = (s3ObjectKey: string) => {
  const params = {
    Bucket: S3_MEDIAS_BUCKET,
    Key: s3ObjectKey,
  };
  if (s3ObjectKey) {
    return from(s3Client.deleteObject(params).promise());
  } else {
    return of('');
  }
};
