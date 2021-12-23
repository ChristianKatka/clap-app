import { Injectable } from '@angular/core';
import { RouterActions } from '@app/store/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { PostsActions } from '../actions';

@Injectable()
export class PostEffects {
  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      switchMap(({ postDraftToDb }) =>
        this.postsService.createPost(postDraftToDb).pipe(
          map((PostApiResponse) =>
            PostsActions.createPostSuccess({ PostApiResponse })
          ),
          catchError((error: string) => {
            console.log(error);
            return of(
              PostsActions.createPostFailure({
                error: 'error creating post',
              })
            );
          })
        )
      )
    )
  );

  createPostWithMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostWithMedia),
      switchMap(({ postWithMediaDraft }) =>
        this.postsService.createPostWithMedia(postWithMediaDraft).pipe(
          map((PostApiResponse) =>
            PostsActions.createPostSuccess({ PostApiResponse })
          ),
          catchError((error: string) => {
            console.log(error);
            return of(
              PostsActions.createPostFailure({
                error: 'error creating post',
              })
            );
          })
        )
      )
    )
  );

  createPostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostSuccess),
      map(() =>
        RouterActions.navigate({
          commands: ['/home'],
          extras: { replaceUrl: true },
        })
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
