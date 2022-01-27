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
  notificationsAmount$ = this.store.select(NotificationsSelectors.getAmountOfNotificationsThatIhaventSeen);
  constructor(private store: Store<PostsExtendedAppState>) {}
}
