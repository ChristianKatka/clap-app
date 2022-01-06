export interface MyNotification {
  id: string;
  seen: boolean;
  createdAt: number;
  userId: string;
  postId: string;
  postText: string;
  postMediaUrl: string | boolean;
  postLikersProfileImage: string;
  postLikersNickname: string;
}
