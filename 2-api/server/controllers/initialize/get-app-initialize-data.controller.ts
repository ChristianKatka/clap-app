import { Context, Next } from 'koa';
import { dynamodbGetAllPosts } from '../../services/dynamodb/posts/dynamodb-get-all-posts.service';
import { dynamodbGetAllPostsLikes } from '../../services/dynamodb/posts/likes/dynamodb-get-all-posts-likes.service';
import { dynamodbGetUserById } from '../../services/dynamodb/users/dynamodb-get-user-by-id.service';

export const getAppInitializeData = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;

  const myProfile = await dynamodbGetUserById(userId);
  const posts = await dynamodbGetAllPosts();
  const postsLikes = await dynamodbGetAllPostsLikes();

  ctx.response.status = 200;
  ctx.response.body = { posts, postsLikes, myProfile };

  await next();
};
