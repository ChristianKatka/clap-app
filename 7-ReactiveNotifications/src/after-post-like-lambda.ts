import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { convertDynamoDBRecord } from './helpers';
import { dynamodbGetNotificationsByUserId } from './services/dynamodb/notifications/dynamodb-get-notifications-by-user-id.service';
import { dynamodbGetPostById } from './services/dynamodb/posts/dynamodb-get-post-by-id.service';
import { createNotificationUtil } from './utils/create-notification.util';

const validateEvent = (event: DynamoDBStreamEvent) => {
  const insertEvent = event.Records.filter(
    (record: any) => record.eventName === 'INSERT'
  )[0];
  if (!insertEvent) return undefined;
  if (!insertEvent.dynamodb) return undefined;

  const comment = convertDynamoDBRecord(insertEvent.dynamodb.NewImage);
  return comment;
};

const checkIfUserHasAlreadyPrevioslyGivenLikeToGivenPost = async (
  post: any,
  like: any
) => {
  const userNotifications = await dynamodbGetNotificationsByUserId(post.userId);

  const likeAlreadyExistedInThePastOnThisPost = userNotifications?.filter(
    (notification: any) =>
      notification.userId === like.userId && notification.postId === like.postId
  )[0];
  return likeAlreadyExistedInThePastOnThisPost;
};

const handler: DynamoDBStreamHandler = (event: DynamoDBStreamEvent) => {
  console.log('Received event:', JSON.stringify(event, null, 4));

  const like = validateEvent(event);
  if (!like) return;

  const mainProcess = async () => {
    const post = await dynamodbGetPostById(like.postId);
    if (!post) return;
    if (post.userId === like.userId) {
      return Promise.resolve('User liked hes own post, dont send notification');
    }

    const userHasLikedThisPostInThePast =
      await checkIfUserHasAlreadyPrevioslyGivenLikeToGivenPost(post, like);

    if (userHasLikedThisPostInThePast) {
      return Promise.resolve(
        'User has liked this post previosly, removed like and liked again. So not gonna send notification'
      );
    }

    await createNotificationUtil(post, like.nickname, like.userId);

    return Promise.resolve('Lambda processed successfully');
  };

  mainProcess()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
