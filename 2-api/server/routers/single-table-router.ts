import Router from "koa-router";
import { addBookToAuthor } from "../controllers/single-table/add-book-to-author";
import { createAuthor } from "../controllers/single-table/create-author.controller";
import { createBook } from "../controllers/single-table/create-book.controller";
import { getBooksByAuthor } from "../controllers/single-table/query/get-books-by-author";
import { getBooksByCategory } from "../controllers/single-table/query/get-books-by-category";

const singleTableRouter = new Router({ prefix: "/single-table" });

singleTableRouter.post("/book", createBook);
singleTableRouter.post("/author", createAuthor);
singleTableRouter.post("/book-to-author", addBookToAuthor);
singleTableRouter.get(
  "/books-by-author/:firstName/:lastName",
  getBooksByAuthor
);
singleTableRouter.get("/books-by-category/:category", getBooksByCategory);

export { singleTableRouter };
