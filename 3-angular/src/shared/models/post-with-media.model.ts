import {
  PostComment,
  PostCommentApiResponse,
  PostCommentDraft,
} from './post-comment.model';
import { PostLike, PostLikeDraft } from './post-like.model';

export interface PostWithMediaDraftToDb {
  id: string;
  text: string;
  postLocation: string;
  mimeType: string;
}

export interface PostWithMediaImageUploaded {
  id: string;
  text: string;
  postLocation: string;
  mimeType: string;
  s3Key: string;
}

export interface PostWithMediaApiRes {
  id: string;
  text: string;
  postLocation: string;
  s3Key: string;
  mimeType: string;
  mediaUrl: string;
  userId: string;
  creatorsProfileImage: string;
  nickname: string;
  createdAt: number;
}

export interface PostWithMedia {
  id: string;
  text: string;
  postLocation: string;
  s3Key: string;
  mimeType: string;
  mediaUrl: string;
  userId: string;
  creatorsProfileImage: string;
  nickname: string;
  createdAt: number;
  iLikeThisPost: string | undefined;
  postLikes: (PostLike | PostLikeDraft)[] | [];
  comments: (PostComment | PostCommentDraft | PostCommentApiResponse)[] | [];
  newComments: PostComment[] | [];
}
