import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { NotificationsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  templateUrl: 'notifications.container.html',
  styleUrls: ['notifications.container.scss'],
})
export class NotificationsContainerComponent implements OnInit {
  notifications$ = this.store.select(NotificationsSelectors.getNotifications);
  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}
}
