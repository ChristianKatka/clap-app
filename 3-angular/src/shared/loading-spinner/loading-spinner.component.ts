import { Component, Input } from '@angular/core';

@Component({
  selector: 'clap-app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  @Input()
  diameter = 40;
}
