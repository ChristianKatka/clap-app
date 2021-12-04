import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PostsActions } from '../actions';

import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { RouterActions } from '@app/store/actions';

@Injectable()
export class PostsEffects {
  getAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getAllPosts),
      switchMap(() =>
        this.postsService.getAllPosts().pipe(
          map((posts) => PostsActions.getAllPostsSuccess({ posts })),
          catchError((error: string) => {
            console.log(error);
            return of(PostsActions.getAllPostsFailure({ error }));
          })
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      switchMap(({ postDraft }) =>
        this.postsService.createPost(postDraft).pipe(
          tap((x) => console.log(x)),
          map((post) => PostsActions.createPostSuccess({ post })),
          catchError((error: string) => {
            console.log(error);
            return of(PostsActions.createPostFailure({ error }));
          })
        )
      )
    )
  );

  // ROUTING AFTER SUCCESS
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

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
}
