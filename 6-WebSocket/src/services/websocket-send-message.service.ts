import { ApiGatewayManagementApi } from "aws-sdk";
import { apiGatewayManagementApi } from "../instances/aws";

export const webSocketSendMessage = async (
  connectionId: string,
  message: string
) => {
  const params: ApiGatewayManagementApi.Types.PostToConnectionRequest = {
    ConnectionId: connectionId,
    Data: JSON.stringify(message),
  };

  return apiGatewayManagementApi.postToConnection(params).promise();
};
