import { Context, Next } from 'koa';
import { dynamoDbGetLocations } from '../../services/dynamodb/locations/dynamodb-get-locations.service';
import { dynamodbGetAllCommentsLikes } from '../../services/dynamodb/posts/comments/likes/dynamodb-get-all-comment-likes.service';
import { dynamodbGetUserById } from '../../services/dynamodb/users/dynamodb-get-user-by-id.service';
import { dynamodbGetUsersProfileImageById } from '../../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';
import { getAllPostsCommentsUtil } from '../../utils/get-all-posts-comments.util';
import { getAllPostsLikesUtil } from '../../utils/get-all-posts-likes.util';
import { getAllPostsUtil } from '../../utils/get-all-posts.util';
import { getMyNotificationsUtil } from '../../utils/get-my-notifications.util';

export const getAppInitializeData = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  // const userId = '9d8320bf-728d-44e9-96e0-48cda0838f6c';

  const PostsApiResponse = await getAllPostsUtil();
  const postsComments = await getAllPostsCommentsUtil();
  const postsLikes = await getAllPostsLikesUtil();
  const commentsLikes = await dynamodbGetAllCommentsLikes();
  const myProfile = await dynamodbGetUserById(userId);
  const myProfileImage = await dynamodbGetUsersProfileImageById(userId);
  const myNotifications = await getMyNotificationsUtil(userId);
  const postLocations = await dynamoDbGetLocations();

  ctx.response.status = 200;
  ctx.response.body = {
    PostsApiResponse,
    postsComments,
    postsLikes,
    myProfile,
    myProfileImage,
    commentsLikes,
    myNotifications,
    postLocations,
  };

  await next();
};
