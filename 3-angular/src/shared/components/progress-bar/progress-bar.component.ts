import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input()
  value = 0;

  constructor() {}

  ngOnInit() {}
}
