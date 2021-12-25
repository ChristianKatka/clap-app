import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { apiGatewayManagementApi } from "./instances/aws";
import { webSocketSendMessage } from "./services/websocket-send-message.service";

const cString = (s: string) => ({
  statusCode: 200,
  body: JSON.stringify({
    msg: s,
  }),
});

const handler: Handler = async (event: APIGatewayProxyEvent) => {
  console.log("Connect event: " + JSON.stringify(event, null, 4));
  console.log("SOCKET CONNECT EVENTTI TAPAHTU!");

  // const connectionId = event.requestContext.connectionId;
  // console.log("TÄSSÄ CONNECTION ID");
  // console.log(connectionId);

  // if (!connectionId) return;
  // await apiGatewayManagementApi
  //   .postToConnection({
  //     ConnectionId: connectionId,
  //     Data: JSON.stringify({ viestisoket: "Socketitla tullu viesti" }),
  //   })
  //   .promise();
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     msg: "socketilta message",
  //   })
  // };

  if (event.requestContext) {
    // api gateway creates one
    const connectionId = event.requestContext.connectionId;
    if (!connectionId) return cString("theres no connection id");
    console.log("HERES CONNECTION ID");
    console.log(connectionId);

    // WHAT ROUTE IS CALLED
    const routeKey = event.requestContext.routeKey;

    switch (routeKey) {
      case "$connect":
        return cString("$connect");

      case "$disconnect":
        return cString("$disconnect");

      case "$default":
        return cString("$default");

      case "sendNotification":
        return await webSocketSendMessage(
          connectionId,
          "sendNotification"
        ).catch((err) => {
          if (err.code === "GoneException") {
            return cString("sendNotification");
          }
          console.log("TÄSSÄ VIRHEVIESTI");
          console.log(err);

          console.error(err);
        });

      // return cString("sendNotification");

      default:
        return cString("switch case default");
    }
  }
};

export { handler };
