import { Context, Next } from 'koa';
import { dynamodbUpdateUserBio } from '../../services/dynamodb/users/dynamodb-update-user-bio.service';

export const updateUserBio = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;
  const bio = ctx.request.body.bio;

  const user = await dynamodbUpdateUserBio(userId, bio);

  ctx.response.status = 200;
  ctx.response.body = user;

  await next();
};
