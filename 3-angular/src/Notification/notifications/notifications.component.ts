import { Component, Input } from '@angular/core';
import { MyNotification } from '@shared/models/my-notification.model';

@Component({
  selector: 'clap-app-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.scss'],
})
export class NotificationsComponent {
  @Input()
  notifications: MyNotification[][] | null = null;
}
