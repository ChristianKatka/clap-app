import { Context, Next } from "koa";
import { dynamodbGetBooksByAuthor } from "../../../services/dynamodb/single-table/query/dynamodb-get-books-by-author.service";

export const getBooksByAuthor = async (ctx: Context, next: Next) => {
  const { firstName, lastName } = ctx.params;

  const authorKey = `${firstName}_${lastName}`;

  const booksByAuthor = await dynamodbGetBooksByAuthor(authorKey);

  ctx.response.body = booksByAuthor;

  await next();
};
