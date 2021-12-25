import { Component, OnInit } from '@angular/core';
import { AuthenticatedActions } from '@auth/store/actions';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { WebSocketService } from 'src/WebSocketStore/services/websocket.service';

@Component({
  selector: 'clap-app-home',
  templateUrl: 'home-feature.container.html',
  styleUrls: ['home-feature.container.scss'],
})
export class HomeFeatureContainerComponent implements OnInit {
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    setTimeout(() => {
      this.webSocketService.sendNotification();
    }, 3000);
  }
}
