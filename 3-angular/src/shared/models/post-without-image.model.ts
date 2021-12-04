export interface PostWithoutImageDraft {
  text: string;
  postType: 'withoutImage';
}

export interface PostWithoutImage {
  id: string;
  text: string;
  nickname: string;
  createdAt: number;
  postType: 'withoutImage';
}
