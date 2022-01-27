import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { convertDynamoDBRecord } from './helpers';
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

    await createNotificationUtil(post, like.nickname, like.userId);

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
