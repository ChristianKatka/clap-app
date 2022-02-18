import { dynamodbGetNotificationsByUserId } from '../services/dynamodb/notifications/dynamodb-get-notifications-by-user-id.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

export const getMyNotificationsUtil = async (userId: string) => {
  const notifications = await dynamodbGetNotificationsByUserId(userId);
  if (!notifications) return [];

  const richNotifications = notifications.map(async (notification) => {
    const notificationCreatorsProfileImage = await dynamodbGetUsersProfileImageById(
      notification.userId
    );
    return {
      ...notification,
      notificationCreatorsProfileImage: notificationCreatorsProfileImage
        ? notificationCreatorsProfileImage.imageUrl
        : 'assets/images/default_profile_image.png',
    };
  });

  return Promise.all(richNotifications);
};
