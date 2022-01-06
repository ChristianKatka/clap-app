import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { MyNotification } from '@shared/models/my-notification.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';

export interface NotificiationsState {
  notifications: { [id: string]: MyNotification };
}

export const initialState: NotificiationsState = {
  notifications: {},
};

const PostsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { myNotifications }) => {
      console.log(myNotifications);

      return {
        ...state,
        notifications: createObjectIndexList(myNotifications),
      };
    }
  ),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: NotificiationsState | undefined,
  action: Action
) => PostsReducer(state, action);
