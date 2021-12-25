import { WEBSOCKET_CONNECTIONS_TABLE } from '../../../constants';
import { docClient } from '../../../instances/aws';

export const dynamodbConnectWebSocket = (item: any) =>
  docClient
    .put({
      TableName: WEBSOCKET_CONNECTIONS_TABLE,
      Item: item,
    })
    .promise()
    .then((res) => res);
