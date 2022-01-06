import { Context, Next } from 'koa';
import { dynamodbGetNotificationsByUserId } from '../../services/dynamodb/notifications/dynamodb-get-notifications-by-user-id.service';
import { dynamodbGetAllCommentsLikes } from '../../services/dynamodb/posts/comments/likes/dynamodb-get-all-comment-likes.service';
import { dynamodbGetAllPostsLikes } from '../../services/dynamodb/posts/likes/dynamodb-get-all-posts-likes.service';
import { dynamodbGetUserById } from '../../services/dynamodb/users/dynamodb-get-user-by-id.service';
import { dynamodbGetUsersProfileImageById } from '../../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';
import { getAllPostsCommentsUtil } from '../../utils/get-all-posts-comments.util';
import { getAllPostsUtil } from '../../utils/get-all-posts.util';
import { getMyNotificationisUtil } from '../../utils/get-my-notifications.util';

export const getAppInitializeData = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  // const userId = '0668311c-3c1d-4cf8-b12d-ef4ebba91d37';

  const PostsApiResponse = await getAllPostsUtil();
  const postsComments = await getAllPostsCommentsUtil();
  const postsLikes = await dynamodbGetAllPostsLikes();
  const commentsLikes = await dynamodbGetAllCommentsLikes();
  const myProfile = await dynamodbGetUserById(userId);
  const myProfileImage = await dynamodbGetUsersProfileImageById(userId);
  const myNotifications = await getMyNotificationisUtil(userId);

  ctx.response.status = 200;
  ctx.response.body = {
    PostsApiResponse,
    postsComments,
    postsLikes,
    myProfile,
    myProfileImage,
    commentsLikes,
    myNotifications,
  };

  await next();
};
