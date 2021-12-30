import { USER_ID_INDEX, WEBSOCKET_CONNECTIONS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const dynamodbGetWsSessionByUserIdService = async (userId: string) => {
  const params = {
    TableName: WEBSOCKET_CONNECTIONS_TABLE,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };
  return await docClient
    .query(params)
    .promise()
    .then((res) => (res.Items ? res.Items[0] : undefined));
};
