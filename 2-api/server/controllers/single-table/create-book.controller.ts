import { Context, Next } from "koa";
import { v4 as uuidv4 } from "uuid";
import { dynamodbCreateBook } from "../../services/dynamodb/single-table/dynamodb-create-book.service";

export const createBook = async (ctx: Context, next: Next) => {
  const { title, reservation, category } = ctx.request.body;

  const bookId = uuidv4();
  const book = {
    PK: `BOOK#${bookId}`,
    SK: `BOOK#${bookId}`,
    GS1PK: `CATEGORY#${category}`,
    GS1SK: `BOOK#${bookId}`,
    title,
    reservation,
  };

  await dynamodbCreateBook(book);

  ctx.response.body = book;

  await next();
};
