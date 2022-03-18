import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { MyNotification } from '@shared/models/my-notification.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostNotificationActions } from '../actions';

export interface NotificiationsState {
  notifications: { [id: string]: MyNotification };
}

export const initialState: NotificiationsState = {
  notifications: {},
};

const NotificationsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { myNotifications }) => {
      return {
        ...state,
        notifications: createObjectIndexList(myNotifications),
      };
    }
  ),
  on(PostNotificationActions.iHaveSeenNotifications, (state) => {
    const myNotifications: MyNotification[] = Object.values({
      ...state.notifications,
    }).map((notification: MyNotification) => ({ ...notification, seen: true }));

    return {
      ...state,
      notifications: createObjectIndexList(myNotifications),
    };
  }),
  on(
    PostNotificationActions.newNotificationHappenedViaSocket,
    (state, { notification }) => {
      // createdAt: 1645206041684
      // id: "4d9756fb-db8d-45c6-bbc6-82743f5a14ee"
      // notificationCreatorsProfileImage: "https://d3ots36zj10h1e.cloudfront.net/profile-images/89dca1f7-d6a6-4b43-9168-9be565690dc7-avatar.jpg"
      // postId: "4f05ade0-53b5-4600-876a-b598caaa6c4f"
      // postLikersNickname: "MattiSeppo"
      // postMediaUrl: false
      // postText: "csa"
      // seen: false
      // userId: "9d8320bf-728d-44e9-96e0-48cda0838f6c"
      // userIdThisNotificationBelongsTo: "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"

      return {
        ...state,
        notifications: {
          ...state.notifications,
          [notification.id]: {
            ...notification,
          },
        },
      };
    }
  ),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: NotificiationsState | undefined,
  action: Action
) => NotificationsReducer(state, action);
