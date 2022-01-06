import { Component, Input, OnInit } from '@angular/core';
import { MyNotification } from '@shared/models/my-notification.model';

@Component({
  selector: 'clap-app-home-top-bar',
  templateUrl: 'home-top-bar.component.html',
  styleUrls: ['home-top-bar.component.scss'],
})
export class HomeTopBarComponent implements OnInit {
  @Input()
  notifications: MyNotification[] | null = null;

  constructor() {}

  ngOnInit() {}
}
