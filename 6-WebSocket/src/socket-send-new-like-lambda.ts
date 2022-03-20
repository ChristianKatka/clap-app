import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { convertDynamoDBRecord } from "./helpers";
import { dynamodbGetActiveWsConnectionsService } from "./services/dynamodb/dynamodb-get-active-ws-connections.service";
import { dynamodbGetUsersProfileImageByIdService } from "./services/dynamodb/dynamodb-get-users-profile-image-by-id.service";
import { sendLikeToUserItBelongsIfHeHasActiveConnectionUtil } from "./utils/send-like-to-user-it-belongs-if-he-has-active-connection.util";

const fetchProfileImageToLikeCreator = async (like: any) => {
  const likersProfileImage = await dynamodbGetUsersProfileImageByIdService(
    like.userId
  );
  if (likersProfileImage) {
    return {
      ...like,
      likersProfileImage: (likersProfileImage as any).imageUrl,
    };
  }
  return {
    ...like,
    likersProfileImage: "assets/images/default_profile_image.png",
  };
};

const validateEvent = (event: DynamoDBStreamEvent) => {
  const insertEvent = event.Records.filter(
    (record: any) => record.eventName === "INSERT"
  )[0];
  if (!insertEvent) return undefined;
  if (!insertEvent.dynamodb) return undefined;

  return convertDynamoDBRecord(insertEvent.dynamodb.NewImage);
};

const handler: DynamoDBStreamHandler = (event: DynamoDBStreamEvent) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  const like = validateEvent(event);
  if (!like) return;

  const mainProcess = async () => {
    const likeWithProfileImage = await fetchProfileImageToLikeCreator(like);

    const connectedClients = await dynamodbGetActiveWsConnectionsService();

    await sendLikeToUserItBelongsIfHeHasActiveConnectionUtil(
      connectedClients,
      likeWithProfileImage
    );

    return Promise.resolve("Lambda processed successfully");
  };

  mainProcess()
    .then(() => {
      console.log("Successfully sent new like via socket");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { handler };
