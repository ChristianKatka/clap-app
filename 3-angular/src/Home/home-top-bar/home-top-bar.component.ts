import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-home-top-bar',
  templateUrl: 'home-top-bar.component.html',
  styleUrls: ['home-top-bar.component.scss'],
})
export class HomeTopBarComponent implements OnInit {
  @Input()
  notificationsAmount: number | null = null;

  constructor() {}

  ngOnInit() {}
}
