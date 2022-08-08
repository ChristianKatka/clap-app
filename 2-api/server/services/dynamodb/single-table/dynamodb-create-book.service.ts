import { docClient } from "../../../instances/aws";

export const dynamodbCreateBook = (book: any) =>
  docClient
    .put({
      TableName: "single-table-design",
      Item: book,
    })
    .promise();
