import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { RouterActions } from '@app/store/actions';

@Injectable()
export class MyProfileEffects {
  constructor(
    private actions$: Actions,

    private store: Store
  ) {}
}
