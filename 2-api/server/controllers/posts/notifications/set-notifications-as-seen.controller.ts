import { Context, Next } from 'koa';
import { dynamodbUpdateNotificationSeenPropertyTrue } from '../../../services/dynamodb/notifications/dynamodb-update-notification-seen-property-true.service';

export const setNotificationsAsSeen = async (ctx: Context, next: Next) => {
  const notifications = ctx.request.body;

  if (!notifications) return;

  const notificationPromises = notifications.map(async (notification: any) => {
    await dynamodbUpdateNotificationSeenPropertyTrue(notification.id);
  });

  Promise.all(notificationPromises);

  ctx.response.status = 200;
  ctx.response.body = { res: 'Success' };

  await next();
};

// NOTIFICATION = 
// createdAt: 1643277674073
// id: "ef398d47-7d9b-4651-89fb-1617a2dcc686"
// postId: "241328a7-022e-45a4-9188-cc50e92c2427"
// postLikersNickname: "MattiSeppo"
// postLikersProfileImage: "https://d3ots36zj10h1e.cloudfront.net/profile-images/89dca1f7-d6a6-4b43-9168-9be565690dc7-avatar.jpg"
// postMediaUrl: "https://d3ots36zj10h1e.cloudfront.net/post-images/18d8c896-8864-47c6-b11f-36dc84b88cdb-profile2.jpg"
// postText: "uus tukka"
// seen: false
// userId: "9d8320bf-728d-44e9-96e0-48cda0838f6c"
// userIdThisNotificationBelongsTo: "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
