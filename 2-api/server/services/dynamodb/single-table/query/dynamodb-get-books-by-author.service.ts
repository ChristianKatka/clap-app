import { docClient } from "../../../../instances/aws";

export const dynamodbGetBooksByAuthor = (authorKey: string) =>
  docClient
    .query({
      TableName: "single-table-design",
      KeyConditionExpression: "PK = :PK AND begins_with ( SK , :SK )",
      ExpressionAttributeValues: {
        ":PK": `AUTHOR#${authorKey}`,
        ":SK": "BOOK",
      },
    })
    .promise()
    .then((res) => res.Items);
