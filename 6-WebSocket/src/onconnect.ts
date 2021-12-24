import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import { dynamodbUpdateSessionConnection } from "./services/dynamodb/dynamodb-update-session-connection";

const handler: Handler = async (event: APIGatewayProxyEvent) => {
  console.log("Connect event: " + JSON.stringify(event, null, 4));

  if (event.queryStringParameters !== null) {
    const userId = event.queryStringParameters["userId"];
    const sessionKey = event.queryStringParameters["sessionkey"];
    const connectionId = event.requestContext.connectionId;

    try {
      const response = await dynamodbUpdateSessionConnection(
        userId,
        sessionKey,
        connectionId as string
      );
    } catch (err) {
      return {
        statusCode: 500,
        body: "Failed to connect: " + JSON.stringify(err),
      };
    }

    return { statusCode: 200, body: "Connected." };
  } else {
    return { statusCode: 403, body: "Failed to connect." };
  }
};

export { handler };
