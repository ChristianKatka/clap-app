import {
  Context,
  DynamoDBStreamEvent,
  DynamoDBStreamHandler,
} from 'aws-lambda';
import { from } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';
import { convertDynamoDBRecord } from './helpers';
import { s3DeleteObject } from './services/s3/s3-delete-object.service';
import { s3GetObject } from './services/s3/s3-get-object.service';

const handler: DynamoDBStreamHandler = (
  event: DynamoDBStreamEvent,
  context: Context
) => {
  console.log('Received event:', JSON.stringify(event, null, 4));

  from(event.Records)
    .pipe(
      filter((record: any) => record.eventName === 'REMOVE'),
      map((record: any) => convertDynamoDBRecord(record.dynamodb.OldImage)),
      concatMap((oldImage) => s3GetObject(oldImage)),
      filter((s3ObjectKey) => s3ObjectKey !== undefined),
      concatMap((s3ObjectKey: string) => s3DeleteObject(s3ObjectKey))
    )
    .subscribe({
      error: (error) => {
        console.log('Error when processing deletion of image s3');
        console.log(error);
      },
      complete: () =>
        context.done(undefined, `Successfully deleted old profile image s3`),
    });
};

export { handler };
