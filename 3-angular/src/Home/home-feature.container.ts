import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { NotificationsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  selector: 'clap-app-home',
  templateUrl: 'home-feature.container.html',
  styleUrls: ['home-feature.container.scss'],
})
export class HomeFeatureContainerComponent implements OnInit {
  notificationsAmount$ = this.store.select(NotificationsSelectors.getAmountOfNotificationsThatIhaventSeen);
  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}
}
