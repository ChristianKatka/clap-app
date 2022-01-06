import { v4 as uuidv4 } from 'uuid';
import { dynamodbCreateNotification } from '../services/dynamodb/notifications/dynamodb-create-notification.service';
import { dynamodbGetPostMediaByPostId } from '../services/dynamodb/posts/dynamodb-get-post-media-by-post-id.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/user/dynamodb-get-users-profile-image-by-id.service';

export const createNotificationUtil = async (
  post: any,
  userWhoGaveTheLikeUserId: any
): Promise<any> => {
  let postLikersProfileImage;
  const profileImage = await dynamodbGetUsersProfileImageById(
    userWhoGaveTheLikeUserId
  );
  const postMedia = await dynamodbGetPostMediaByPostId(post.id);

  if (!profileImage)
    postLikersProfileImage = 'assets/images/default_profile_image.png';

  const notification = {
    id: uuidv4(),
    seen: false,
    createdAt: Date.now(),
    userId: post.userId,
    postId: post.id,
    postText: post.text,
    postMediaUrl: postMedia ? postMedia.mediaUrl : false,
    postLikersProfileImage: profileImage
      ? profileImage.imageUrl
      : postLikersProfileImage,
  };

  await dynamodbCreateNotification(notification);
};
