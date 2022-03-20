import { dynamodbGetAllPostsComments } from '../services/dynamodb/posts/comments/dynamodb-get-all-posts-comments.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-users-profile-image-by-id.service';

const fetchProfileImageToCommentCreator = async (comment: any) => {
  const commentersProfileImage = await dynamodbGetUsersProfileImageById(
    comment.userId
  );
  if (commentersProfileImage) {
    return {
      ...comment,
      commentersProfileImage: (commentersProfileImage as any).imageUrl,
    };
  }
  return {
    ...comment,
    commentersProfileImage: 'assets/images/default_profile_image.png',
  };
};

export const getAllPostsCommentsUtil = async () => {
  const comments = await dynamodbGetAllPostsComments();

  if (!comments) return [];

  const commentsWithCreatorsProfileImagePromises = comments.map(
    async (comment: any) => await fetchProfileImageToCommentCreator(comment)
  );
  const commentsWithCreatorsProfileImage = await Promise.all(
    commentsWithCreatorsProfileImagePromises
  );

  return commentsWithCreatorsProfileImage;
};
