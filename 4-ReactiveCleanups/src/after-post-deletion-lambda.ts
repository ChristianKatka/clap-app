import {
  Context,
  DynamoDBStreamEvent,
  DynamoDBStreamHandler,
} from 'aws-lambda';
import { from } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { convertDynamoDBRecord } from './helpers';
import { dynamodbDeleteComments } from './services/dynamodb/dynamodb-delete-comments.service';
import { dynamodbDeleteLikes } from './services/dynamodb/dynamodb-delete-likes.service';
import { dynamodbGetPostCommentsByPostId } from './services/dynamodb/dynamodb-get-post-comments-by-post-id.service';
import { dynamodbGetPostLikesByPostId } from './services/dynamodb/dynamodb-get-post-likes-by-post-id.service';

const handler: DynamoDBStreamHandler = (
  event: DynamoDBStreamEvent,
  context: Context
) => {
  console.log('Received event:', JSON.stringify(event, null, 4));
  let postId = '';
  from(event.Records)
    .pipe(
      filter((record: any) => record.eventName === 'REMOVE'),
      map((record: any) => convertDynamoDBRecord(record.dynamodb.OldImage)),
      tap((oldImage) => (postId = oldImage.id)),
      concatMap(() => dynamodbGetPostCommentsByPostId(postId)),
      concatMap((comments) => dynamodbDeleteComments(comments)),
      concatMap(() => dynamodbGetPostLikesByPostId(postId)),
      concatMap((likes) => dynamodbDeleteLikes(likes))
    )
    .subscribe({
      error: (error) => {
        console.log('Error when processing after post deletion lambda');
        console.log(error);
      },
      complete: () =>
        context.done(
          undefined,
          `Successfully deleted all files related to the post`
        ),
    });
};

export { handler };
