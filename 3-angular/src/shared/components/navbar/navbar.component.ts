import { Component, Input } from '@angular/core';

@Component({
  selector: 'clap-app-navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent {
  @Input()
  notificationsAmount: number | null = null;
}
