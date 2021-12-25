import { apiGatewayManagementApi } from "../instances/aws";

export const webSocketSendMessage = async (
  connectionId: string,
  message: string
) => {
  const params = {
    ConnectionId: connectionId,
    Data: JSON.stringify({ message1: message, title: "mun title" }),
  };

  return apiGatewayManagementApi.postToConnection(params).promise();
};
