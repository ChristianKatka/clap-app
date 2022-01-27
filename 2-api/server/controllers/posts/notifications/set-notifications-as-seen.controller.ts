import { Context, Next } from 'koa';
import { dynamodbUpdateNotificationSeenPropertyTrue } from '../../../services/dynamodb/notifications/dynamodb-update-notification-seen-property-true.service';

export const setNotificationsAsSeen = async (ctx: Context, next: Next) => {
  const userId = ctx.state.jwtPayload.sub;

  const notifications = ctx.request.body;

  if (!notifications) return;

  const notificationPromises = notifications.map(async (notification: any) => {
    await dynamodbUpdateNotificationSeenPropertyTrue(notification.id);
  });

  const notifs = Promise.all(notificationPromises);

  ctx.response.status = 200;
  ctx.response.body = {};

  await next();
};
