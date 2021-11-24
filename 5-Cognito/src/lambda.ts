import { CognitoUserPoolTriggerEvent, Context, Handler } from "aws-lambda";
import { dynamodbCreateUser } from "./services/dynamodb/dynamodb-create-user.service";

const handler: Handler = async (
  event: CognitoUserPoolTriggerEvent,
  context: Context
) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  if (event && event.triggerSource === "PostAuthentication_Authentication") {
    if (!event.userName) return;
    await dynamodbCreateUser(event.userName, event.request.userAttributes.sub);
    console.log("Succesfully created user to dynamodb");
    context.done(undefined, event);
  }
  context.done(undefined, event);
};

export { handler };
