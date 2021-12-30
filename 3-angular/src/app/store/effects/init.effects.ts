import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InitializeService } from '@app/services/init.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { InitActions, RouterActions } from '../actions';

@Injectable()
export class InitEffects {
  loadApplicationInitializeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.loadApplicationInitializeData),
      switchMap(() =>
        this.initializeService.loadApplicationInitializeData().pipe(
          map(
            ({
              PostsApiResponse,
              postsLikes,
              myProfile,
              myProfileImage,
              postsComments,
              commentsLikes,
            }) =>
              InitActions.loadApplicationInitializeDataSuccess({
                PostsApiResponse,
                postsLikes,
                myProfile,
                myProfileImage,
                postsComments,
                commentsLikes,
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
