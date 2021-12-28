import { dynamodbDeleteWsSessionService } from "../services/dynamodb/dynamodb-delete-websocket-connection.service";
import { webSocketSendMessage } from "../services/websocket-send-message.service";

export const sendCommentToAllActiveClientsUtil = async (
  connectedClients: any[],
  comment: any
): Promise<any> => {
  const sendCommentToAllActiveClientsPromises = connectedClients.map(
    async (client: any) =>
      await webSocketSendMessage(client.connectionId, comment).catch((err) => {
        if (err.code === "GoneException") {
          return dynamodbDeleteWsSessionService(client.connectionId).catch(
            (err) => {
              console.error(err);
            }
          );
        }
        console.error(err);
      })
  );

  return Promise.resolve("sent comments");
};
