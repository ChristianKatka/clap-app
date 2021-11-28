import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'clap-app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.scss'],
})
export class WelcomeComponent {
  @Output()
  startUsingApp = new EventEmitter();
}
