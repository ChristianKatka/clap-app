import { PostLike } from './post-like.model';

export interface PostWithoutImageDraft {
  text: string;
  postType: 'withoutImage';
  likes: [];
}

export interface PostWithoutImage {
  id: string;
  text: string;
  nickname: string;
  createdAt: number;
  postType: 'withoutImage';
  iLikeThisPost: boolean;
  likes: PostLike[];
}
