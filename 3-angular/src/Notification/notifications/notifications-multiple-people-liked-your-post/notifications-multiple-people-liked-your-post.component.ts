import { Component, Input } from '@angular/core';
import { MyNotification } from '@shared/models/my-notification.model';

@Component({
  selector: 'clap-app-notifications-multiple-people-liked-your-post',
  templateUrl: 'notifications-multiple-people-liked-your-post.component.html',
  styleUrls: ['notifications-multiple-people-liked-your-post.component.scss'],
})
export class NotificationsMultiplePeopleLikedYourPostComponent {
  @Input()
  notifications: MyNotification[] | null = null;
}
