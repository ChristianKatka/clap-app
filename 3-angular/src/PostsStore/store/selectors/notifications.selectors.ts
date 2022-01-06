import { createSelector } from '@ngrx/store';
import { getNotificationsState } from '../reducers';

export const getNotifications = createSelector(
  getNotificationsState,
  (state) => {
    console.log(state.notifications);
    return Object.values(state.notifications);
  }
);
