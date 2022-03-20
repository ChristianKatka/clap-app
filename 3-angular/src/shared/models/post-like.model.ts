export interface PostLikeDraftWithoutId {
  postId: string;
  userId: string;
}

export interface PostLikeDraft {
  id: string;
  postId: string;
  userId: string;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: 1638635426735;
  nickname: string;
  likersProfileImage: string;
}
