export interface PostWithImageDraft {
  id: string
  image: File,
  imageName: string,
  mimeType: string,
  text: string
  postType: 'withImage',
  iLikeThisPost: undefined,
  postLikes: [],
}

export interface PostWithImage {
  id: string;
  text: string;
  postType: 'withImage'
}

