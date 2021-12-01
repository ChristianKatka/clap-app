import { Component, OnInit } from '@angular/core';
import { AuthenticatedActions } from '@auth/store/actions';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'clap-app-home',
  templateUrl: 'home-feature.container.html',
  styleUrls: ['home-feature.container.scss'],
})
export class HomeFeatureContainerComponent implements OnInit {
  constructor(private store: Store<AuthExtendedAppState>) {}

  ngOnInit() {}
}
