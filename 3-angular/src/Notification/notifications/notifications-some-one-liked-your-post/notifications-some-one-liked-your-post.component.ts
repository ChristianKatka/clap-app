import { Component, Input } from '@angular/core';
import { MyNotification } from '@shared/models/my-notification.model';

@Component({
  selector: 'clap-app-notifications-some-one-liked-your-post',
  templateUrl: 'notifications-some-one-liked-your-post.component.html',
  styleUrls: ['notifications-some-one-liked-your-post.component.scss'],
})
export class NotificationsSomeOneLikedYourPostComponent {
  @Input()
  notifications: MyNotification[] | null = null;
}
