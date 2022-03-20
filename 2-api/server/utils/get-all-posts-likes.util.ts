import { dynamodbGetAllPostsLikes } from '../services/dynamodb/posts/likes/dynamodb-get-all-posts-likes.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

const fetchProfileImageToLikeCreator = async (like: any) => {
  const likersProfileImage = await dynamodbGetUsersProfileImageById(
    like.userId
  );
  if (likersProfileImage) {
    return {
      ...like,
      likersProfileImage: (likersProfileImage as any).imageUrl,
    };
  }
  return {
    ...like,
    likersProfileImage: 'assets/images/default_profile_image.png',
  };
};

export const getAllPostsLikesUtil = async () => {
  const likes = await dynamodbGetAllPostsLikes();

  if (!likes) return [];

  const likesWithCreatorsProfileImagePromises = likes.map(
    async (like: any) => await fetchProfileImageToLikeCreator(like)
  );
  const likesWithCreatorsProfileImage = await Promise.all(
    likesWithCreatorsProfileImagePromises
  );

  return likesWithCreatorsProfileImage;
};
