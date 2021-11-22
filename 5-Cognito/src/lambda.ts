import { Context, Handler, CognitoUserPoolTriggerEvent } from "aws-lambda";
import { valuesIn, isNil } from "lodash";

import {
  PostConfirmationEventHandler,
  PostConfirmationEventTypes,
} from "./event-handlers/post-confirmation-eventhandler";



let postConfirmationEventHandler: PostConfirmationEventHandler;


const handler: Handler = (
  event: CognitoUserPoolTriggerEvent,
  context: Context
) => {
  if (valuesIn(PostConfirmationEventTypes).includes(event.triggerSource)) {
    if (isNil(postConfirmationEventHandler)) {
      postConfirmationEventHandler = new PostConfirmationEventHandler();
    }

    postConfirmationEventHandler.handlePostConfirmationEvent(event, context);
  } else {
    context.done(undefined, event);
  }

  console.log(JSON.stringify(event, null, 4));
  context.done(undefined, event);
};

export { handler };
