import { dynamodbDeleteWsSessionService } from "../services/dynamodb/dynamodb-delete-websocket-connection.service";
import { webSocketSendMessage } from "../services/websocket-send-message.service";

export const sendCommentToAllActiveClientsUtil = async (
  connectedClients: any[],
  comment: any
): Promise<any> => {
  // Dont send socket message to person who created the comment
  const connectedClientsExceptMe = connectedClients.filter(
    (client) => client.userId !== comment.userId
  );

  const sendCommentToAllActiveClientsPromises = connectedClientsExceptMe.map(
    async (client: any) =>
      await webSocketSendMessage(client.connectionId, {
        newComment: comment,
      }).catch((err) => {
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
