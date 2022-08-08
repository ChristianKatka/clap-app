import { docClient } from "../../../../instances/aws";

export const dynamodbGetBooksByCategory = (category: string) =>
  docClient
    .query({
      TableName: "single-table-design",
      IndexName: 'gs1',
      KeyConditionExpression: "GS1PK = :GS1PK AND begins_with ( GS1SK , :GS1SK )",
      ExpressionAttributeValues: {
        ":GS1PK": `CATEGORY#${category}`,
        ":GS1SK": "BOOK",
      },
    })
    .promise()
    .then((res) => res.Items);
