import { dynamodbGetNotificationsByUserId } from '../services/dynamodb/notifications/dynamodb-get-notifications-by-user-id.service';
import { dynamodbGetUserById } from '../services/dynamodb/users/dynamodb-get-user-by-id.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

export const getMyNotificationisUtil = async (userId: string) => {
  const notifications = await dynamodbGetNotificationsByUserId(userId);
  if (!notifications) return [];

  const notificationCreatorUser = await dynamodbGetUserById(userId);
  const notificationCreatorsProfileImage =
    await dynamodbGetUsersProfileImageById(userId);

  const richNotifications = notifications.map((notification) => {
    return {
      ...notification,
      postLikersNickname: notificationCreatorUser
        ? notificationCreatorUser.nickname
        : 'error gettin nickname',
        // TÄMMÖNE iffittely ei toimi
      postLikersProfileImage: notificationCreatorsProfileImage
        ? notificationCreatorsProfileImage.imageUrl
        : 'assets/images/default_profile_image.png',
    };
  });

  return richNotifications;
};
