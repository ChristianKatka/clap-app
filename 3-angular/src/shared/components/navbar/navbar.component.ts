import { Component, Input } from '@angular/core';
import { MyNotification } from '@shared/models/my-notification.model';

@Component({
  selector: 'clap-app-navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent {
  @Input()
  notifications: MyNotification[] | null = null;
}
