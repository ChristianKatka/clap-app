export interface PostCommentDraft {
  id: string;
  postId: string;
  text: string;
  likersProfileImage: string;
  nickname: string;
}

export interface PostComment {
  id: string;
  postId: string;
  text: string;
  likersProfileImage: string;
  nickname: string;
  userId: string;
  createdAt: number;
}
