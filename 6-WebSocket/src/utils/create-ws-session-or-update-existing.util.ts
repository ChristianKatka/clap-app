import { dynamodbCreateWsSessionService } from "../services/dynamodb/dynamodb-create-ws-session.service";
import { dynamodbGetWsSessionByUserIdService } from "../services/dynamodb/dynamodb-get-ws-session-by-user-id.service";
import { dynamodbUpdateWsSessionService } from "../services/dynamodb/dynamodb-update-ws-session.service";

export const createWsSessionOrUpdateExistingUtil = async (
  userId: string,
  connectionId: string
): Promise<any> => {
  const sessionAlreadyExists = await dynamodbGetWsSessionByUserIdService(
    userId
  );

  if (sessionAlreadyExists)
    return await dynamodbUpdateWsSessionService(userId, connectionId);

  return await dynamodbCreateWsSessionService(userId, connectionId);
};
