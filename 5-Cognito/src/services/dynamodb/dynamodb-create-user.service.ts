import { docClient } from "../../instances/aws";
import { USERS_TABLE } from "../../constants";

export const dynamodbCreateUser = (
  sub: string,
  email: string,
  nickname: string
) => {
  const user = {
    id: sub,
    email,
    nickname,
  };

  return docClient
    .put({
      TableName: USERS_TABLE,
      Item: user,
    })
    .promise();
};
