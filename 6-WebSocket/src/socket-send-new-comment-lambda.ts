import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { convertDynamoDBRecord } from "./helpers";
import { dynamodbGetActiveWsConnectionsService } from "./services/dynamodb/dynamodb-get-active-ws-connections.service";
import { sendCommentToAllActiveClientsUtil } from "./utils/send-comment-to-all-active-clients.util";

const validateEvent = (event: DynamoDBStreamEvent) => {
  const insertEvent = event.Records.filter(
    (record: any) => record.eventName === "INSERT"
  )[0];
  if (!insertEvent) return undefined;
  if (!insertEvent.dynamodb) return undefined;

  const comment = convertDynamoDBRecord(insertEvent.dynamodb.NewImage);
  return comment;
};

const handler: DynamoDBStreamHandler = (event: DynamoDBStreamEvent) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  const comment = validateEvent(event);
  if (!comment) return;

  const mainProcess = async () => {
    const connectedClients = await dynamodbGetActiveWsConnectionsService();
    await sendCommentToAllActiveClientsUtil(connectedClients, comment);

    return Promise.resolve("Lambda processed successfully");
  };

  mainProcess()
    .then(() => {
      console.log("Successfully sent new comment via socket");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
