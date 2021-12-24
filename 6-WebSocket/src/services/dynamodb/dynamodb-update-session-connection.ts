import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbUpdateSessionConnection = (
  userId: string,
  sessionKey: string,
  connectionId: string
): Promise<any> => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Key: {
      userId: userId,
      sessionKey: sessionKey,
    },
    UpdateExpression: "set #connectionId = :connectionId",
    ConditionExpression: "#sessionKey = :sessionKey",
    ExpressionAttributeNames: {
      "#connectionId": "connectionId",
      "#sessionKey": "sessionKey",
    },
    ExpressionAttributeValues: {
      ":connectionId": connectionId,
      ":sessionKey": sessionKey,
    },
  };
  return docClient.update(params).promise();
};
