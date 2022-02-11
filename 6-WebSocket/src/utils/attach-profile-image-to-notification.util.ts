import { dynamodbGetUsersProfileImageByIdService } from "../services/dynamodb/dynamodb-get-users-profile-image-by-id.service";

export const attachProfileImageToNotificationUtil = async (
  notification: any
): Promise<any> => {
  const notificationCreatorsProfileImage =
    await dynamodbGetUsersProfileImageByIdService(notification.userId);
  if (notificationCreatorsProfileImage) {
    return {
      ...notification,
      notificationCreatorsProfileImage: (
        notificationCreatorsProfileImage as any
      ).imageUrl,
    };
  } else {
    return {
      ...notification,
      notificationCreatorsProfileImage:
        "assets/images/default_profile_image.png",
    };
  }
};
