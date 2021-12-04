import { PostLike } from './post-like.model';

export interface PostWithoutImageDraft {
  text: string;
  postType: 'withoutImage';
  iLikeThisPost: undefined;
  postLikes: [];
}

export interface PostWithoutImage {
  id: string;
  text: string;
  nickname: string;
  createdAt: number;
  postType: 'withoutImage';
  iLikeThisPost: string | undefined;
  postLikes: PostLike[] | [];
}