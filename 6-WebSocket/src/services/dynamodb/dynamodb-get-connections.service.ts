import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbGetConnectionsService = () => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
  };
  return docClient.scan(params).promise();
};
