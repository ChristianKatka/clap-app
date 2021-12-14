import { of } from 'rxjs';
import { DYNAMODB_PROFILE_IMAGES_TABLE } from '../../constants';
import { docClient } from '../../instances/aws';

export const dynamodbDeleteOldProfileImagesIfAny = (items: any) => {
  if (items.length >= 2) {
    const oldProfileImage = items.reduce((prev: any, curr: any) =>
      prev.createdAt < curr.createdAt ? prev : curr
    );
    return docClient
      .delete({
        TableName: DYNAMODB_PROFILE_IMAGES_TABLE,
        Key: { id: oldProfileImage.id },
      })
      .promise();
  }
  return of('nothing to delete');
};
