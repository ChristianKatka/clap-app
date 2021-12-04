import Router from 'koa-router';
import { createPost } from '../controllers/posts/create-post.controller';
import { getAllPosts } from '../controllers/posts/get-all-posts.controller';
import { giveLikeToPost } from '../controllers/posts/likes/give-like-to-post.controller';
import { removeLikeFromPost } from '../controllers/posts/likes/remove-like-from-post.controller';

const postsRouter = new Router({ prefix: '/posts' });

postsRouter.get('/', getAllPosts);
postsRouter.post('/', createPost);
postsRouter.post('/like/:postId', giveLikeToPost);
postsRouter.delete('/like/:likeId', removeLikeFromPost);

export { postsRouter };
