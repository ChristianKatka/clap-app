import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { NotificationsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  selector: 'clap-app-navbar',
  templateUrl: 'navbar.container.html',
  styleUrls: ['navbar.container.scss'],
})
export class NavbarContainerComponent {
  notifications$ = this.store.select(NotificationsSelectors.getNotifications);
  constructor(private store: Store<PostsExtendedAppState>) {}
}
