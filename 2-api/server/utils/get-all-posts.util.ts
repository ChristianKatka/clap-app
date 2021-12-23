import { dynamodbGetAllPosts } from '../services/dynamodb/posts/dynamodb-get-all-posts.service';
import { dynamodbGetAllPostsMedias } from '../services/dynamodb/posts/media/dynamodb-get-all-posts-medias.service';
import { attachProfileImagesToPosts } from './attach-profile-images-to-posts.util';

const putMediaInsidePostIfPostHasMedia = (post: any, medias: any) => {
  // IF NO SINGLE MEDIA IN ANY POST
  if (!medias) return post;
  const postMedia = medias.filter((media: any) => post.id === media.postId)[0];
  if (!postMedia) return post;
  const mediaWhatIneed = {
    mimeType: postMedia.mimeType,
    s3Key: postMedia.s3Key,
    mediaUrl: postMedia.mediaUrl,
  };
  return { ...post, ...mediaWhatIneed };
};

export const getAllPostsUtil = async () => {
  const posts = await dynamodbGetAllPosts();

  if (!posts) return [];

  const postsWithCreatorsProfileImage = await attachProfileImagesToPosts(posts);
  const medias = await dynamodbGetAllPostsMedias();

  const regularPostsAndMediaPosts = postsWithCreatorsProfileImage.map(
    (post: any) => {
      const regularPostOrMediaPost = putMediaInsidePostIfPostHasMedia(
        post,
        medias
      );
      return regularPostOrMediaPost;
    }
  );

  return regularPostsAndMediaPosts;
};
