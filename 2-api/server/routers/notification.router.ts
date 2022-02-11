import Router from 'koa-router';
import { setNotificationsAsSeen } from '../controllers/posts/notifications/set-notifications-as-seen.controller';

const notificationRouter = new Router({ prefix: '/notification' });

notificationRouter.post(
  '/set-notification-as-seen',
  setNotificationsAsSeen
);

export { notificationRouter };
