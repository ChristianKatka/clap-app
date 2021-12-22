import { PostComment, PostCommentDraft } from './post-comment.model';
import { PostLike, PostLikeDraft } from './post-like.model';

export interface PostWithMediaDraftToDb {
  id: string;
  text: string;
  mimeType: string;
}

export interface PostWithMediaFromDb {
  id: string;
  text: string;
  s3Key: string
  mimeType: string
  mediaUrl: string;
  userId: string;
  creatorsProfileImage: string;
  nickname: string;
  createdAt: number;
}

export interface PostWithMedia {
  id: string;
  text: string;
  s3Key: string
  mimeType: string
  mediaUrl: string;
  userId: string;
  creatorsProfileImage: string;
  nickname: string;
  createdAt: number;
  iLikeThisPost: string | undefined;
  postLikes: PostLike[] | PostLikeDraft[] | [];
  comments: PostComment[] | PostCommentDraft[] | [];
}
