import { SNSEvent, Handler } from "aws-lambda";
import { dynamodbDeleteWebSocketConnection } from "./services/dynamodb/dynamodb-delete-websocket-connection";
import { dynamodbGetConnections } from "./services/dynamodb/dynamodb-get-connections";
import { webSocketSendMessage } from "./services/websocket-send-message.service";

const handler: Handler = async (event: SNSEvent) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  const message = JSON.parse(event.Records[0].Sns.Message);
  const { propertyId } = message;

  const connections = await dynamodbGetConnections()
    .then((res) => res.Items || [])
    .then((connections) =>
      connections.filter(
        (connection) =>
          propertyId === undefined ||
          connection.ownedProperties.includes(propertyId) ||
          connection.guestProperties.includes(propertyId)
      )
    );

  console.log(JSON.stringify(connections, null, 4));

  const promises = connections.map((connection) => {
    const { connectionId } = connection;
    return webSocketSendMessage(connectionId, message).catch((err) => {
      if (err.code === "GoneException") {
        return dynamodbDeleteWebSocketConnection(connectionId).catch((err) => {
          console.error(err);
        });
      }
      console.error(err);
    });
  });

  await Promise.all(promises);
};

export { handler };
