import Router from 'koa-router';
import { updateUserBio } from '../controllers/user/update-user-bio.controller';

const userRouter = new Router({ prefix: '/user' });

userRouter.put('/bio', updateUserBio);

export { userRouter };
