import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/store/reducers';
import { AboutActions } from '../store/actions';

@Component({
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsOfServiceComponent {
  constructor(private store: Store<AppState>) {}

  onClose() {
    this.store.dispatch(AboutActions.closeTermsOfService());
  }
}
