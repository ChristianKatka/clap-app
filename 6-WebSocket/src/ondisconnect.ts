import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import { dynamodbDeleteWebSocketConnection } from "./services/dynamodb/dynamodb-delete-websocket-connection";

const handler: Handler = async (event: APIGatewayProxyEvent) => {
  console.log(
    "Connection id to disconnect: " + event.requestContext.connectionId
  );

  const response = await dynamodbDeleteWebSocketConnection(
    event.requestContext.connectionId as string
  )
    .then((res) => ({
      statusCode: 200,
      body: JSON.stringify("Disconnected."),
    }))
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 200,
        body: JSON.stringify("Disconnected."),
      };
    });

  return response;
};

export { handler };
