import {
  Context,
  DynamoDBStreamEvent,
  DynamoDBStreamHandler,
} from 'aws-lambda';
import { from } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';
import { convertDynamoDBRecord } from './helpers';
import { dynamodbDeleteOldProfileImagesIfAny } from './services/dynamodb/dynamodb-delete-old-profile-images-if-any.service';
import { dynamodbGetProfileImagesByUserId } from './services/dynamodb/dynamodb-get-profile-images-by-user-id.service';

const handler: DynamoDBStreamHandler = (
  event: DynamoDBStreamEvent,
  context: Context
) => {
  console.log('Received event:', JSON.stringify(event, null, 4));

  from(event.Records)
    .pipe(
      filter((record: any) => record.eventName === 'INSERT'),
      map((record: any) => convertDynamoDBRecord(record.dynamodb.NewImage)),
      concatMap((newImage) =>
        dynamodbGetProfileImagesByUserId(newImage.userId)
      ),
      concatMap((newImage) =>
        dynamodbDeleteOldProfileImagesIfAny(newImage.Items)
      )
    )
    .subscribe({
      error: (error) => {
        console.log('Error when processing deletion of image db');
        console.log(error);
      },
      complete: () =>
        context.done(undefined, `Successfully deleted old profile image db`),
    });
};

export { handler };
