import * as AWS from "aws-sdk";
import { ENDPOINT } from "../constants";

AWS.config.update({ region: "eu-west-1" });

export const docClient = new AWS.DynamoDB.DocumentClient();

export const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  endpoint: ENDPOINT,
});
