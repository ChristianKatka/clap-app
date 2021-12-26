import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { dynamodbDeleteWsSessionService } from "./services/dynamodb/dynamodb-delete-websocket-connection.service";
import { webSocketSendMessage } from "./services/websocket-send-message.service";
import { createWsSessionOrUpdateExistingUtil } from "./utils/create-ws-session-or-update-existing.util";
import { lambdaAcceptableReturnTypeUtil } from "./utils/lambda-acceptable-return-type.util";

const handler: Handler = async (event: APIGatewayProxyEvent) => {
  console.log("Connect event: " + JSON.stringify(event, null, 4));

  if (!event.requestContext.connectionId)
    return lambdaAcceptableReturnTypeUtil("error: no connection id");

  // WHAT ROUTE IS CALLED
  const routeKey = event.requestContext.routeKey;
  const connectionId = event.requestContext.connectionId;

  switch (routeKey) {
    case "$connect":
      if (!event.queryStringParameters)
        return lambdaAcceptableReturnTypeUtil("error: no user id");
      const userId = event.queryStringParameters["userId"];
      await createWsSessionOrUpdateExistingUtil(userId, connectionId);
      return lambdaAcceptableReturnTypeUtil("$connect");

    case "$disconnect":
      await dynamodbDeleteWsSessionService(connectionId);
      return lambdaAcceptableReturnTypeUtil("$disconnect");

    case "sendNotification":
      await webSocketSendMessage(connectionId, "sendNotification");
      return lambdaAcceptableReturnTypeUtil("sendNotification");

    case "$default":
      return lambdaAcceptableReturnTypeUtil("$default");
    default:
      return lambdaAcceptableReturnTypeUtil("switch case default");
  }
};

export { handler };
