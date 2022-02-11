import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyNotification } from '@shared/models/my-notification.model';
import { Observable, take } from 'rxjs';
import { PostNotificationActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { NotificationsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  templateUrl: 'notifications.container.html',
  styleUrls: ['notifications.container.scss'],
})
export class NotificationsContainerComponent implements OnInit {
  notifications$: Observable<MyNotification[][]> = this.store.select(
    NotificationsSelectors.getNotifications
  );
  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {
    this.setNotificationsStatusAsSeenIfThereIsNotificationsThatIhaventSeen();
  }

  setNotificationsStatusAsSeenIfThereIsNotificationsThatIhaventSeen() {
    this.store
      .select(NotificationsSelectors.getNotificationsThatIhaventSeen)
      .pipe(take(1))
      .subscribe({
        next: (notificationsThatIhaventSeen: MyNotification[]) => {
          if (
            notificationsThatIhaventSeen &&
            notificationsThatIhaventSeen.length
          ) {
            this.store.dispatch(
              PostNotificationActions.iHaveSeenNotifications({
                notificationsThatIhaventSeen,
              })
            );
          }
        },
        error: (e) => console.error(e),
        complete: () => console.info(),
      });
  }
}
