import Router from 'koa-router';
import { createPost } from '../controllers/posts/create-post.controller';
import { giveLikeToPost } from '../controllers/posts/likes/give-like-to-post.controller';
import { removeLikeFromPost } from '../controllers/posts/likes/remove-like-from-post.controller';

const postsRouter = new Router({ prefix: '/posts' });

postsRouter.post('/', createPost);
postsRouter.post('/like/:postId/:likeId', giveLikeToPost);
postsRouter.delete('/like/:likeId', removeLikeFromPost);

export { postsRouter };
