import { docClient } from "../../instances/aws";
import { USERS_TABLE } from "../../constants";

export const dynamodbCreateUser = (username: string, sub: string) => {
  const user = {
    id: sub,
    email: username,
  };

  return docClient
    .put({
      TableName: USERS_TABLE,
      Item: user,
    })
    .promise();
};
