import { PostComment, PostCommentDraft } from './post-comment.model';
import { PostLike, PostLikeDraft } from './post-like.model';

export interface PostDraft {
  text: string;
}

export interface PostApiResponse {
  id: string;
  userId: string;
  creatorsProfileImage: string;
  text: string;
  nickname: string;
  createdAt: number;
}

export interface Post {
  id: string;
  userId: string;
  creatorsProfileImage: string;
  text: string;
  nickname: string;
  createdAt: number;
  iLikeThisPost: string | undefined;
  postLikes: PostLike[] | PostLikeDraft[] | [];
  comments: PostComment[] | PostCommentDraft[] | [];
  newComments: PostComment[] | [];
}
