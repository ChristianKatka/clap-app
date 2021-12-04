import { Context, Next } from 'koa';
import { dynamodbGetAllPosts } from '../../services/dynamodb/posts/dynamodb-get-all-posts.service';
import { dynamodbGetPostLikes } from '../../services/dynamodb/posts/dynamodb-get-post-likes.service';
import { dynamodbGetUserById } from '../../services/dynamodb/users/dynamodb-get-user-by-id.service';

export const getAppInitializeData = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;

  const myProfile = await dynamodbGetUserById(userId);
  const posts = await dynamodbGetAllPosts();

  if (!posts) return;

  const postsWithLikesPromises = posts.map(async (post: any) => {
    const likes = await dynamodbGetPostLikes(post.id);

    const iHaveLikedThisPost = likes?.filter(
      (like: any) => like.userId === userId
    )[0];

    if (iHaveLikedThisPost) {
      return { ...post, likes, iLikeThisPost: true };
    }
    return { ...post, likes, iLikeThisPost: false };
  });
  const postsWithLikes = await Promise.all(postsWithLikesPromises);

  ctx.response.status = 200;
  ctx.response.body = { posts: postsWithLikes, myProfile };

  await next();
};
