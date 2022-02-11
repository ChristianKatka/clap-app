import { createSelector } from '@ngrx/store';
import { sortByCreatedAtDateAscending } from '@shared/helpers/sort-by-created-at-date-ascending';
import { MyNotification } from '@shared/models/my-notification.model';
import { getNotificationsState } from '../reducers';

export const getNotifications = createSelector(
  getNotificationsState,
  (state) => {
    const postNotifications = sortByCreatedAtDateAscending(
      Object.values(state.notifications)
    );

    const groupedNotificationsByPostId = postNotifications.reduce(
      (previousValue: any, currentValue: any) => {
        let key = currentValue['postId'];

        if (!previousValue[key]) {
          previousValue[key] = [];
        }
        previousValue[key].push(currentValue);
        return previousValue;
      },
      {}
    );
    

    const myNotificationsGroupedByPosts: MyNotification[][] = Object.values(
      groupedNotificationsByPostId
    );
    return myNotificationsGroupedByPosts;
  }
);

export const getAmountOfNotificationsThatIhaventSeen = createSelector(
  getNotificationsState,
  (state) => {
    const notificationsThatIHaventSeen: MyNotification[] = Object.values(
      state.notifications
    ).filter((notification: MyNotification) => notification.seen === false);

    return notificationsThatIHaventSeen.length;
  }
);

export const getNotificationsThatIhaventSeen = createSelector(
  getNotificationsState,
  (state) => {
    const notificationsThatIHaventSeen: MyNotification[] = Object.values(
      state.notifications
    ).filter((notification: MyNotification) => notification.seen === false);

    return notificationsThatIHaventSeen;
  }
);
