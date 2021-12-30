import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbUpdateWsSessionService = (
  userId: string,
  connectionId: string
): Promise<any> => {
  // Expire the connection an hour later.
  const expiration = Date.now() / 1000 + 3600;

  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Key: {
      userId,
    },
    UpdateExpression: "SET connectionId = :connectionId, expiration = :expiration",
    ExpressionAttributeValues: {
      ":connectionId": connectionId,
      ":expiration": expiration,
    },
  };
  return docClient.update(params).promise();
};
