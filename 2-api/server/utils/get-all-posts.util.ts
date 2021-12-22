import { dynamodbGetAllPosts } from '../services/dynamodb/posts/dynamodb-get-all-posts.service';
import { attachProfileImagesToPosts } from './attach-profile-images-to-posts.util';

export const getAllPostsUtil = async () => {
  const posts = await dynamodbGetAllPosts();

  if (!posts) return [];

  const postsWithCreatorsProfileImage = await attachProfileImagesToPosts(posts);

  return postsWithCreatorsProfileImage;
};
