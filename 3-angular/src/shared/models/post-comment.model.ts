export interface PostCommentDraft {
  id: string;
  postId: string;
  text: string;
  commentersProfileImage: string;
  nickname: string;
}

export interface PostComment {
  id: string;
  postId: string;
  text: string;
  commentersProfileImage: string;
  nickname: string;
  userId: string;
  createdAt: number;
}
