import { Component, Input } from '@angular/core';

@Component({
  selector: 'clap-app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
})
export class AlertComponent {
  @Input()
  text = '';
}
