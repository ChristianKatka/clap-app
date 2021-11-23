import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { InitActions, RouterActions } from '../actions';
import { RoutingService } from '@app/services/routing.service';
import { InitializingService } from '@app/services/init.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap, map } from 'rxjs';

@Injectable()
export class InitEffects {
  loadApplicationStartData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.loadApplicationInitializingData),
      switchMap(() =>
        this.initializingService.loadApplicationInitializingData().pipe(
          map(({ data }) =>
            InitActions.loadApplicationInitializingDataSuccess({
              data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              InitActions.loadApplicationInitializingDataFailure({
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
      ofType(InitActions.loadApplicationInitializingDataSuccess),
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
    private routingService: RoutingService,
    private initializingService: InitializingService
  ) {}
}
