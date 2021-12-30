import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbDeleteWsSessionService = async (
  userId: string
): Promise<any> => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Key: {
      userId,
    },
  };
  return docClient.delete(params).promise();
};
