import { CognitoUserPoolTriggerEvent, Context } from "aws-lambda";
import { UsersService } from "../services/users.service";

export const PostConfirmationEventTypes = {
  ConfirmSignUp: "PostConfirmation_ConfirmSignUp",
  ConfirmForgotPassword: "PostConfirmation_ConfirmForgotPassword",
};

export class PostConfirmationEventHandler {
  handlePostConfirmationEvent(
    event: CognitoUserPoolTriggerEvent,
    context: Context
  ) {
    console.log('event');
    
    const userName = event.userName;
    const sub = event.request.userAttributes.sub;

    if (userName) {
      UsersService.updateConfirmedUser(userName, sub, true).subscribe(
        (response) => {
          context.done(undefined, event);
        }
      );
    } else {
      context.done(new Error("User name is invalid."), event);
    }
  }
}
