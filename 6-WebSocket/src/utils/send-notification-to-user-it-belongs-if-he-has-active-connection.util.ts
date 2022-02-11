import { dynamodbDeleteWsSessionService } from "../services/dynamodb/dynamodb-delete-websocket-connection.service";
import { webSocketSendMessage } from "../services/websocket-send-message.service";

export const sendNotificationToUserItBelongsIfHeHasActiveConnectionUtil =
  async (connectedClients: any[], notification: any): Promise<any> => {
    
    // Dont send socket message if person doesnt have active connection
    const activeConnectionThisNotificationBelongsTo = connectedClients.filter(
      (client) => client.userId === notification.userIdThisNotificationBelongsTo
    )[0];

    if (!activeConnectionThisNotificationBelongsTo)
      return Promise.resolve(
        "user has no active connection so no web socket message is sent"
      );

    await webSocketSendMessage(
      activeConnectionThisNotificationBelongsTo.connectionId,
      {
        newNotification: notification,
      }
    ).catch((err) => {
      if (err.code === "GoneException") {
        return dynamodbDeleteWsSessionService(
          activeConnectionThisNotificationBelongsTo.connectionId
        ).catch((err) => {
          console.error(err);
        });
      }
      console.error(err);
    });

    return Promise.resolve("sent notification");
  };
