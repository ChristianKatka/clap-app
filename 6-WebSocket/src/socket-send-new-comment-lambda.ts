import {
  Context,
  DynamoDBStreamEvent,
  DynamoDBStreamHandler,
} from "aws-lambda";

import { forkJoin, from } from "rxjs";
import { concatMap, filter, map, mergeMap, tap } from "rxjs/operators";
import { convertDynamoDBRecord } from "./helpers";
import { dynamodbGetActiveWsConnectionsService } from "./services/dynamodb/dynamodb-get-active-ws-connections.service";
import { webSocketSendMessage } from "./services/websocket-send-message.service";
import { sendCommentToAllActiveClientsUtil } from "./utils/send-comment-to-all-active-clients.util";

const handler: DynamoDBStreamHandler = (
  event: DynamoDBStreamEvent,
  context: Context
) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  let comment = {};

  from(event.Records)
    .pipe(
      filter((record: any) => record.eventName === "INSERT"),
      map((record: any) => convertDynamoDBRecord(record.dynamodb.NewImage)),
      tap((newComment: any) => (comment = newComment)),
      concatMap(() => dynamodbGetActiveWsConnectionsService()),
      concatMap((connectedClients: any[]) =>
        sendCommentToAllActiveClientsUtil(connectedClients, comment)
      )
    )
    .subscribe({
      error: (error) => {
        console.log("Error when sending new comment via socket");
        console.log(error);
      },
      complete: () =>
        context.done(undefined, `Successfully sent new comment via socket`),
    });
};

export { handler };
