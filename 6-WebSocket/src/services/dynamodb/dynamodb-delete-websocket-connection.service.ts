import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbDeleteWsSessionService = async (
  connectionId: string
): Promise<any> => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    Key: {
      connectionId,
    },
  };
  return docClient.delete(params).promise();
};
