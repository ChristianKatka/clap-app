import { createAction, props } from '@ngrx/store';
import { MyNotification } from '@shared/models/my-notification.model';

export const iHaveSeenNotifications = createAction(
  '[Notifications] I Have Seen Notifications',
  props<{ notificationsThatIhaventSeen: MyNotification[] }>()
);
export const iHaveSeenNotificationsSuccess = createAction(
  '[Notifications] I Have Seen Notifications Success'
);

export const iHaveSeenNotificationsFailure = createAction(
  '[Notifications] I Have Seen Notifications Failure',
  props<{ error: string }>()
);

export const newNotificationHappenedViaSocket = createAction(
  '[Notifications] New Notification Happened Via Socket',
  props<{ notification: MyNotification }>()
);
