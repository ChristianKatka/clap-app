import { Context, Next } from "koa";
import { dynamodbCreateAuthor } from "../../services/dynamodb/single-table/dynamodb-create-author.service";

export const createAuthor = async (ctx: Context, next: Next) => {
  const { firstName, lastName } = ctx.request.body;

  const authorKey = `${firstName}_${lastName}`;
  const author = {
    PK: `AUTHOR#${authorKey}`,
    SK: `AUTHOR#${authorKey}`,
    firstName,
    lastName,
  };

  await dynamodbCreateAuthor(author);

  ctx.response.body = author;

  await next();
};
