import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'clap-app-post-top-bar',
  templateUrl: 'post-top-bar.component.html',
  styleUrls: ['post-top-bar.component.scss'],
})
export class PostTopBarComponent {
  @Output()
  goBack = new EventEmitter();
  constructor() {}
}
