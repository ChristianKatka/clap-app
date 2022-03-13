import { Context, Next } from 'koa';
import { dynamodbUpdateUsersSelectedLocation } from '../../services/dynamodb/users/dynamodb-update-users-location.service';

export const selectLocation = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  const selectedLocation = ctx.request.body.selectedLocation;

  const user = await dynamodbUpdateUsersSelectedLocation(
    userId,
    selectedLocation
  );

  ctx.response.status = 200;
  ctx.response.body = user;

  await next();
};
