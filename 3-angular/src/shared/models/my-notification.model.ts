export interface MyNotification {
  id: string;
  seen: boolean;
  createdAt: number;
  userId: string;
  userIdThisNotificationBelongsTo: string;
  postId: string;
  postText: string;
  postMediaUrl: string | boolean;
  notificationCreatorsProfileImage: string;
  postLikersNickname: string;
}
