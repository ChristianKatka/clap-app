import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { convertDynamoDBRecord } from "./helpers";
import { dynamodbGetActiveWsConnectionsService } from "./services/dynamodb/dynamodb-get-active-ws-connections.service";
import { attachProfileImageToCommentUtil } from "./utils/attach-profile-image-to-comment.util";
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

// TODO ASYNC HANDLER
const handler: DynamoDBStreamHandler = (event: DynamoDBStreamEvent) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  const comment = validateEvent(event);
  if (!comment) return;

  const mainProcess = async () => {
    const commentWithCommentersImage = await attachProfileImageToCommentUtil(comment);
    const connectedClients = await dynamodbGetActiveWsConnectionsService();
    await sendCommentToAllActiveClientsUtil(
      connectedClients,
      commentWithCommentersImage
    );

    return Promise.resolve("Lambda processed successfully");
  };

  // RETURN AWAIT MAIN PROCESS
  mainProcess()
    .then(() => {
      console.log("Successfully sent new comment via socket");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
