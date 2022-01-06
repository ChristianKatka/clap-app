export interface Notification {
  id: string;
  seen: boolean;
  createdAt: number;
  userId: string;
  postId: string;
  postText: string;
  postMediaUrl: string | boolean;
  postLikersProfileImage: string;
}
