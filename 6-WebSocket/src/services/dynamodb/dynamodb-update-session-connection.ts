import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbUpdateSessionConnection = (
  userId: string,
  sessionKey: string,
): Promise<any> => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Key: {
      userId: userId,
      sessionKey: sessionKey,
    },
    ExpressionAttributeNames: {
      "#sessionKey": "sessionKey",
    },
    ExpressionAttributeValues: {
      ":sessionKey": 'Muutettu',
    },
  };
  return docClient.update(params).promise();
};
