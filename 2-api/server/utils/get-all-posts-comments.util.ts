import { dynamodbGetAllPostsComments } from '../services/dynamodb/posts/comments/dynamodb-get-all-posts-comments.service';
import { dynamodbGetUsersProfileImageById } from '../services/dynamodb/users/profile-image/dynamodb-get-user-by-id.service';

const fetchProfileImageToCommentCreator = async (comment: any) => {
  const likersProfileImage = await dynamodbGetUsersProfileImageById(
    comment.userId
  );
  if (likersProfileImage) {
    return {
      ...comment,
      likersProfileImage: (likersProfileImage as any).imageUrl,
    };
  } else {
    return {
      ...comment,
      likersProfileImage: 'assets/images/default_profile_image.png',
    };
  }
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
