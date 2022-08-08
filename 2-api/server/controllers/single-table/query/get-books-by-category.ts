import { Context, Next } from "koa";
import { dynamodbGetBooksByCategory } from "../../../services/dynamodb/single-table/query/dynamodb-get-books-by-category.service";

export const getBooksByCategory = async (ctx: Context, next: Next) => {
  const { category } = ctx.params;

  const booksByCategory = await dynamodbGetBooksByCategory(category);

  ctx.response.body = booksByCategory;

  await next();
};
