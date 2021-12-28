import { dynamodbGetUsersProfileImageByIdService } from "../services/dynamodb/dynamodb-get-users-profile-image-by-id.service";

export const attachProfileImageToCommentUtil = async (
  comment: any
): Promise<any> => {
  const commentersProfileImage = await dynamodbGetUsersProfileImageByIdService(
    comment.userId
  );
  if (commentersProfileImage) {
    return {
      ...comment,
      commentersProfileImage: (commentersProfileImage as any).imageUrl,
    };
  } else {
    return {
      ...comment,
      commentersProfileImage: "assets/images/default_profile_image.png",
    };
  }
};
