import { of } from 'rxjs';
import {DYNAMODB_POSTS_LIKES } from '../../constants';
import { docClient } from '../../instances/aws';

export const dynamodbDeleteLikes = (likes: any) => {
  if (likes.length) {
    const deletedLikesPromises = likes.map(
      async (comment: any) =>
        await docClient
          .delete({
            TableName: DYNAMODB_POSTS_LIKES,
            Key: { id: comment.id },
          })
          .promise()
    );
    return Promise.all(deletedLikesPromises);
  }
  return Promise.resolve('No Likes to delete');
};
