import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/store/reducers';
import { AboutActions } from '../store/actions';

@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent {
  constructor(private store: Store<AppState>) {}

  onClose() {
    this.store.dispatch(AboutActions.closePrivacyPolicy());
  }
}
