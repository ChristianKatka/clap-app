import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { InitActions, RouterActions } from '../actions';
import { InitializeService } from '@app/services/init.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap, map } from 'rxjs';

@Injectable()
export class InitEffects {
  loadApplicationInitializeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.loadApplicationInitializeData),
      switchMap(() =>
        this.initializeService.loadApplicationInitializeData().pipe(
          map(({ posts, likes }) =>
            InitActions.loadApplicationInitializeDataSuccess({
              posts,
              likes,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              InitActions.loadApplicationInitializeDataFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  // ROUTING AFTER SUCCESS
  itemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.loadApplicationInitializeDataSuccess),
      map(() =>
        RouterActions.navigate({
          commands: ['/home'],
          extras: { replaceUrl: true },
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private initializeService: InitializeService
  ) {}
}
