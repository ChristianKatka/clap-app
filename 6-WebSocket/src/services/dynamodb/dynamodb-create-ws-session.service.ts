import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbCreateWsSessionService = (
  userId: string,
  connectionId: string
): Promise<any> => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Item: {
      connectionId,
      userId,
      // Expire the connection an hour later.
      ttl: Date.now() / 1000 + 3600,
    },
  };
  return docClient.put(params).promise();
};
