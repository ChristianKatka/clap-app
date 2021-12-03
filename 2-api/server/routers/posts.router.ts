import Router from 'koa-router';
import { createPost } from '../controllers/posts/create-post.controller';
import { getAllPosts } from '../controllers/posts/get-all-posts.controller';

const postsRouter = new Router({ prefix: '/posts' });

postsRouter.get('/', getAllPosts);
postsRouter.post('/', createPost);

export { postsRouter };
