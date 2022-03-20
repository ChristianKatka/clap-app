import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

export const attachProfileImageToPost = async (post: any) => {
  const creatorsProfileImage = await dynamodbGetUsersProfileImageById(
    post.userId
  );
  if (creatorsProfileImage) {
    return {
      ...post,
      creatorsProfileImage: (creatorsProfileImage as any).imageUrl,
    };
  }
  return {
    ...post,
    creatorsProfileImage: 'assets/images/default_profile_image.png',
  };
};
