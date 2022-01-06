import {
  Context,
  DynamoDBStreamEvent,
  DynamoDBStreamHandler,
} from 'aws-lambda';
import { concatMap, filter, from, map, tap } from 'rxjs';
import { convertDynamoDBRecord } from './helpers';
import { dynamodbGetPostById } from './services/dynamodb/posts/dynamodb-get-post-by-id.service';
import { dynamodbGetUserById } from './services/dynamodb/user/dynamodb-get-user-by-id.service';
import { createNotificationUtil } from './utils/create-notification.util';

// const handler: DynamoDBStreamHandler = (
//   event: DynamoDBStreamEvent,
//   context: Context
// ) => {
//   console.log('Received event:', JSON.stringify(event, null, 4));

//   let like = undefined;
//   from(event.Records)
//     .pipe(
//       filter((record: any) => record.eventName === 'INSERT'),
//       map((record: any) => convertDynamoDBRecord(record.dynamodb.NewImage)),
//       tap((newImage) => (like = newImage)),
//       concatMap((newImage) => dynamodbGetPostById(newImage.postId)),
//       // concatMap((comments) => dynamodbDeleteComments(comments)),
//       // concatMap(() => dynamodbGetPostLikesByPostId(postId)),
//       // concatMap((likes) => dynamodbDeleteLikes(likes))
//     )
//     .subscribe({
//       error: (error) => {
//         console.log('Error when processing after post deletion lambda');
//         console.log(error);
//       },
//       complete: () =>
//         context.done(
//           undefined,
//           `Successfully deleted all files related to the post`
//         ),
//     });
// };

// export { handler };

const validateEvent = (event: DynamoDBStreamEvent) => {
  const insertEvent = event.Records.filter(
    (record: any) => record.eventName === 'INSERT'
  )[0];
  if (!insertEvent) return undefined;
  if (!insertEvent.dynamodb) return undefined;

  const comment = convertDynamoDBRecord(insertEvent.dynamodb.NewImage);
  return comment;
};

// TODO ASYNC HANDLER
const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  console.log('Received event:', JSON.stringify(event, null, 4));

  const like = validateEvent(event);
  if (!like) return;

  const mainProcess = async () => {
    const post = await dynamodbGetPostById(like.postId);
    if (!post) return;
    if (post.userId === like.userId) {
      return Promise.resolve('User liked hes own post, dont send notification');
    }
    const userWhoGaveTheLike = await dynamodbGetUserById(like.userId);

    const notification = await createNotificationUtil(like, post, userWhoGaveTheLike);

    return Promise.resolve('Lambda processed successfully');
  };

  // RETURN AWAIT MAIN PROCESS
  await mainProcess()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
