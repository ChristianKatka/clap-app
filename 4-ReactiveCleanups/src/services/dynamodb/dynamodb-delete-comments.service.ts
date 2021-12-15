import { of } from 'rxjs';
import { DYNAMODB_POSTS_COMMENTS } from '../../constants';
import { docClient } from '../../instances/aws';

export const dynamodbDeleteComments = (comments: any) => {
  if (comments.length) {
    const deletedCommentsPromises = comments.map(
      async (comment: any) =>
        await docClient
          .delete({
            TableName: DYNAMODB_POSTS_COMMENTS,
            Key: { id: comment.id },
          })
          .promise()
    );
    return Promise.all(deletedCommentsPromises);
  }
  return of('No comments to delete');
};
