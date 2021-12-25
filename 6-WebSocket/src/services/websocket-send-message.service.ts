import { ApiGatewayManagementApi } from 'aws-sdk';
import { ENDPOINT } from "../constants";
import { apiGatewayManagementApi } from "../instances/aws";

export const webSocketSendMessage = async (
  connectionId: string,
  message: string
) => {
  const params: ApiGatewayManagementApi.Types.PostToConnectionRequest = {
    ConnectionId: connectionId,
    Data: message,
  };

  console.log("TÄSSÄ ENDPOINT MIHIN TARGETETAAN");
  console.log(ENDPOINT);

  return apiGatewayManagementApi.postToConnection(params).promise();
};
