import { CognitoUserPoolTriggerEvent, Context, Handler } from "aws-lambda";
import { dynamodbCreateUser } from "./services/dynamodb/dynamodb-create-user.service";

const handler: Handler = async (
  event: CognitoUserPoolTriggerEvent,
  context: Context
) => {
  console.log("Received event:", JSON.stringify(event, null, 4));

  if (event && event.triggerSource === "PostConfirmation_ConfirmSignUp") {
    if (!event.userName) return;
    await dynamodbCreateUser(
      event.request.userAttributes.sub,
      event.request.userAttributes.email,
      event.request.userAttributes.nickname
    );
    console.log("Succesfully created user to dynamodb");
    context.done(undefined, event);
  }
  context.done(undefined, event);
};

export { handler };
