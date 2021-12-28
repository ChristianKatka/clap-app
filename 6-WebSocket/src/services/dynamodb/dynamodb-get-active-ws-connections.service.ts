import { WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbGetActiveWsConnectionsService = () => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
  };
  return docClient
    .scan(params)
    .promise()
    .then((res) => (res.Items ? res.Items : []));
};
