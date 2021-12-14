import { Context, Next } from 'koa';
import { dynamodbGetAllPosts } from '../services/dynamodb/posts/dynamodb-get-all-posts.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-user-by-id.service';

const fetchProfileImageToPostCreator = async (post: any) => {
  const creatorsProfileImage = await dynamodbGetUsersProfileImageById(
    post.userId
  );
  if (creatorsProfileImage) {
    return {
      ...post,
      creatorsProfileImage: (creatorsProfileImage as any).imageUrl,
    };
  } else {
    return {
      ...post,
      creatorsProfileImage: 'assets/images/default_profile_image.png',
    };
  }
};

export const getAllPostsUtil = async () => {
  const posts = await dynamodbGetAllPosts();

  if (!posts) return [];

  const postsWithCreatorsProfileImagePromises = posts.map(
    async (post: any) => await fetchProfileImageToPostCreator(post)
  );
  const postsWithCreatorsProfileImage = await Promise.all(
    postsWithCreatorsProfileImagePromises
  );

  return postsWithCreatorsProfileImage;
};
