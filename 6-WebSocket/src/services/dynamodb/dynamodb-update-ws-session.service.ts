import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbUpdateWsSessionService = (
  connectionId: string
): Promise<any> => {
  // Expire the connection an hour later.
  const ttl = Date.now() / 1000 + 3600;

  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Key: {
      connectionId,
    },
    UpdateExpression: "SET connectionId = :connectionId, ttl = :ttl",
    ExpressionAttributeValues: {
      ":connectionId": connectionId,
      ":ttl": ttl,
    },
  };
  return docClient.update(params).promise();
};
