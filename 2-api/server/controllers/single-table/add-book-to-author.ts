import { Context, Next } from "koa";
import { dynamodbAddBookToAuthor } from "../../services/dynamodb/single-table/dynamodb-add-book-to-author.service";

export const addBookToAuthor = async (ctx: Context, next: Next) => {
  const { title, bookId, firstName, lastName } = ctx.request.body;

  const authorKey = `${firstName}_${lastName}`;
  const book = {
    PK: `AUTHOR#${authorKey}`,
    SK: `BOOK#${bookId}`,
    title,
  };

  await dynamodbAddBookToAuthor(book);

  ctx.response.body = book;

  await next();
};
