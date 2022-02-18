import { dynamodbDeleteWsSessionService } from "../services/dynamodb/dynamodb-delete-websocket-connection.service";
import { dynamodbGetPostById } from "../services/dynamodb/dynamodb-get-post-by-id.service";
import { webSocketSendMessage } from "../services/websocket-send-message.service";

export const sendLikeToUserItBelongsIfHeHasActiveConnectionUtil = async (
  connectedClients: any[],
  like: any
): Promise<any> => {
  // Dont send socket like if user liked own post
  const post = await dynamodbGetPostById(like.postId);
  if (!post) return;
  const userLikedHesOwnPost = like.userId === post.userId;
  if (userLikedHesOwnPost)
    return Promise.resolve(
      "user has liked hes own post, dont send socket like"
    );
  console.log("userLikedHesOwnPost");
  console.log(userLikedHesOwnPost);

  // Send notif to post owner
  // Dont send socket message if person doesnt have active connection
  const activeConnectionThisPostLikeBelongsTo = connectedClients.filter(
    (client) => client.userId === post.userId
  )[0];
  console.log("activeConnectionThisPostLikeBelongsTo");

  console.log(activeConnectionThisPostLikeBelongsTo);

  if (!activeConnectionThisPostLikeBelongsTo)
    return Promise.resolve(
      "user has no active connection so no web socket message is sent"
    );

  console.log("nyt pitäs olla lähtemäs");

  await webSocketSendMessage(
    activeConnectionThisPostLikeBelongsTo.connectionId,
    {
      newLike: like,
    }
  ).catch((err) => {
    if (err.code === "GoneException") {
      return dynamodbDeleteWsSessionService(
        activeConnectionThisPostLikeBelongsTo.connectionId
      ).catch((err) => {
        console.error(err);
      });
    }
    console.error(err);
  });

  return Promise.resolve("sent new like");
};
