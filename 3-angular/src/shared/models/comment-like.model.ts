export interface CommentLikeDraftWithoutId {
  commentId: string;
  userId: string;
}

export interface CommentLikeDraft {
  id: string;
  commentId: string;
  userId: string;
}

export interface CommentLike {
  id: string;
  commentId: string;
  userId: string;
  createdAt: 1638635426735;
  nickname: string;
  likersProfileImage: string;
}
