import { apiGatewayManagementApi } from "../instances/aws";

export const webSocketSendMessage = async (
  connectionId: string,
  message: any
) => {
  const params = {
    ConnectionId: connectionId,
    Data: JSON.stringify(message),
  };
  return apiGatewayManagementApi.postToConnection(params).promise();
};
