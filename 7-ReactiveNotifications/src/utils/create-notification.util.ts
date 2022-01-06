import { v4 as uuidv4 } from 'uuid';
import { dynamodbGetPostMediaByPostId } from '../services/dynamodb/posts/dynamodb-get-post-media-by-post-id.service';


export const createNotificationUtil = async (
  like: any,
  post: any,
  userWhoGaveTheLike: any
): Promise<any> => {
  // {id, userId, seen, createdAt, postId, postText, postMediaUrl, postLikersProfileImage, }


const postMedia = await dynamodbGetPostMediaByPostId(post.id);

  const notification = {
    id: uuidv4(),
    seen: 'false',
    createdAt:  Date.now(),
    userId: post.userId,
    postId: post.id,
    postText: post.text,
    postMediaUrl: postMedia ? postMedia.mediaUrl : undefined
  }


};
