import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { convertDynamoDBRecord } from "./helpers";
import { dynamodbGetActiveWsConnectionsService } from "./services/dynamodb/dynamodb-get-active-ws-connections.service";
import { sendLikeToUserItBelongsIfHeHasActiveConnectionUtil } from "./utils/send-like-to-user-it-belongs-if-he-has-active-connection.util";

const validateEvent = (event: DynamoDBStreamEvent) => {
  const insertEvent = event.Records.filter(
    (record: any) => record.eventName === "INSERT"
  )[0];
  if (!insertEvent) return undefined;
  if (!insertEvent.dynamodb) return undefined;

  return convertDynamoDBRecord(insertEvent.dynamodb.NewImage);
};

const handler: DynamoDBStreamHandler = (event: DynamoDBStreamEvent) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  const like = validateEvent(event);
  if (!like) return;

  console.log(like);

  const mainProcess = async () => {
    const connectedClients = await dynamodbGetActiveWsConnectionsService();

    await sendLikeToUserItBelongsIfHeHasActiveConnectionUtil(
      connectedClients,
      like
    );

    return Promise.resolve("Lambda processed successfully");
  };

  mainProcess()
    .then(() => {
      console.log("Successfully sent new like via socket");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
