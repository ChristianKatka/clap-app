import {
  WEBSOCKET_CONNECTIONS_INDEX_CONNECTION,
  WEBSOCKET_CONNECTIONS_TABLE,
} from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbDeleteWebSocketConnection = async (
  connectionId: string
): Promise<any> => {
  const queryParams = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    IndexName: WEBSOCKET_CONNECTIONS_INDEX_CONNECTION,
    KeyConditionExpression: "#connectionId = :connectionId",
    ExpressionAttributeNames: {
      "#connectionId": "connectionId",
    },
    ExpressionAttributeValues: {
      ":connectionId": connectionId,
    },
  };

  const websocketConnectionsResponse = await docClient
    .query(queryParams)
    .promise();

  if (
    websocketConnectionsResponse.Count === 1 &&
    websocketConnectionsResponse.Items
  ) {
    const params = {
      TableName: WEBSOCKET_CONNECTIONS_TABLE,
      Key: {
        userId: websocketConnectionsResponse.Items[0].userId,
        sessionKey: websocketConnectionsResponse.Items[0].sessionKey,
      },
    };
    return docClient.delete(params).promise();
  } else {
    return Promise.resolve("Nothing to delete.");
  }
};
