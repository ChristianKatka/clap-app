import { docClient } from "../../../instances/aws";

export const dynamodbCreateAuthor = (author: any) =>
  docClient
    .put({
      TableName: "single-table-design",
      Item: author,
    })
    .promise()
