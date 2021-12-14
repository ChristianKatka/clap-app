import {
  Context,
  DynamoDBStreamHandler,
  DynamoDBStreamEvent,
} from 'aws-lambda';
import { from } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { convertDynamoDBRecord } from './helpers';
import { s3DeleteObject } from './services/s3/s3-delete-object.service';
import { s3GetObject } from './services/s3/s3-get-object.service';

const handler: DynamoDBStreamHandler = (
  event: DynamoDBStreamEvent,
  context: Context
) => {
  console.log('Received event:', JSON.stringify(event, null, 4));

  // delete old user image from dynamodb
  from(event.Records)
    .pipe(
      filter((record: any) => record.eventName === 'INSERT'),
      map((record: any) => convertDynamoDBRecord(record.dynamodb.NewImage)),
      tap((x) => console.log(x)),
      // concatMap((oldImage) => s3GetObject(oldImage)),
      // filter((s3ObjectKey) => s3ObjectKey !== undefined),
      // concatMap((s3ObjectKey: string) => s3DeleteObject(s3ObjectKey))
    )
    .subscribe({
      error: (error) => {
        console.log('Error when processing deletion of image db');
        console.log(error);
      },
      complete: () => context.done(undefined, `Successfully deleted old profile image db`),
    });


// Delete image from s3
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
        console.log('Error when processing deletion of image');
        console.log(error);
      },
      complete: () => context.done(undefined, `Successfully deleted old profile image`),
    });

};

export { handler };
