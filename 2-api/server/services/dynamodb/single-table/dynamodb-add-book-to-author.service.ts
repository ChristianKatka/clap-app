import { docClient } from "../../../instances/aws";

export const dynamodbAddBookToAuthor = (book: any) =>
  docClient
    .put({
      TableName: "single-table-design",
      Item: book,
    })
    .promise()
