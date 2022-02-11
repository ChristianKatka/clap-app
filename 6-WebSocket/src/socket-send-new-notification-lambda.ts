import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { convertDynamoDBRecord } from "./helpers";
import { dynamodbGetActiveWsConnectionsService } from "./services/dynamodb/dynamodb-get-active-ws-connections.service";
import { attachProfileImageToNotificationUtil } from "./utils/attach-profile-image-to-notification.util";
import { sendNotificationToUserItBelongsIfHeHasActiveConnectionUtil } from "./utils/send-notification-to-user-it-belongs-if-he-has-active-connection.util";

const validateEvent = (event: DynamoDBStreamEvent) => {
  const insertEvent = event.Records.filter(
    (record: any) => record.eventName === "INSERT"
  )[0];
  if (!insertEvent) return undefined;
  if (!insertEvent.dynamodb) return undefined;

  return convertDynamoDBRecord(insertEvent.dynamodb.NewImage);
};

const handler: DynamoDBStreamHandler = (event: DynamoDBStreamEvent) => {
  // console.log("Received event:", JSON.stringify(event, null, 4));

  const notification = validateEvent(event);
  if (!notification) return;

  console.log(notification);

  const mainProcess = async () => {
    const notificationWithNotificationCreatorsProfileImage =
      await attachProfileImageToNotificationUtil(notification);
    const connectedClients = await dynamodbGetActiveWsConnectionsService();

    await sendNotificationToUserItBelongsIfHeHasActiveConnectionUtil(
      connectedClients,
      notificationWithNotificationCreatorsProfileImage
    );

    return Promise.resolve("Lambda processed successfully");
  };

  mainProcess()
    .then(() => {
      console.log("Successfully sent new notification via socket");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
