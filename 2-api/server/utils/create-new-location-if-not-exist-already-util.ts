import { dynamodbCreateLocation } from '../services/dynamodb/locations/dynamodb-create-location.service';
import { dynamodbGetLocation } from '../services/dynamodb/locations/dynamodb-get-location.service';

export const createNewLocationIfNotExistsAlready = async (location: string) => {
  const locationExists = await dynamodbGetLocation(location);

  if (locationExists) return;

  return await dynamodbCreateLocation(location);
};
