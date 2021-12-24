import * as AWS from "aws-sdk";
import { DOMAIN_NAME } from "../constants";

export const docClient = new AWS.DynamoDB.DocumentClient();

export const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  endpoint: DOMAIN_NAME,
});

export const snsClient = new AWS.SNS();
