import { PostComment, PostCommentApiResponse, PostCommentDraft } from './post-comment.model';
import { PostLike, PostLikeDraft } from './post-like.model';

export interface PostDraft {
  text: string;
  postLocation: string;
}

export interface PostApiResponse {
  id: string;
  userId: string;
  creatorsProfileImage: string;
  text: string;
  postLocation: string;
  nickname: string;
  createdAt: number;
}

export interface Post {
  id: string;
  userId: string;
  creatorsProfileImage: string;
  text: string;
  postLocation: string;
  nickname: string;
  createdAt: number;
  iLikeThisPost: string | undefined;
  postLikes: (PostLike | PostLikeDraft)[] | [];
  comments: (PostComment | PostCommentDraft | PostCommentApiResponse)[] | [];
  newComments: PostComment[] | [];
}
