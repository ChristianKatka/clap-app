export interface PostCommentDraft {
  id: string;
  postId: string;
  text: string;
  likersProfileImage: string;
}

export interface PostComment {
  id: string;
  postId: string;
  text: string;
  likersProfileImage: string;
  userId: string;
  nickname: string;
  createdAt: number;
}
