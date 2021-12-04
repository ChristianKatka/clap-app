import { Context, Next } from 'koa';
import { dynamodbGetAllPosts } from '../../services/dynamodb/posts/dynamodb-get-all-posts.service';
import { dynamodbGetPostLikes } from '../../services/dynamodb/posts/dynamodb-get-post-likes';

export const getAppInitializeData = async (ctx: Context, next: Next) => {
  const posts = await dynamodbGetAllPosts();

  if (!posts) return;


  const postsWithLikesPromises = posts.map(async (post: any) => {
   const likes =  await dynamodbGetPostLikes(post.id)
   return {...post, likes,}
  });

  const postsWithLikes = await Promise.all(postsWithLikesPromises);

  ctx.response.status = 200;
  ctx.response.body = { posts: postsWithLikes };

  await next();
};
