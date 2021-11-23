import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {}
