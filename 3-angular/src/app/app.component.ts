import { Component, OnInit } from '@angular/core';
import { AuthenticatedActions } from '@auth/store/actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(AuthenticatedActions.checkOldUserSession());
  }
}
