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
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';

@Injectable()
export class PostsEffects {
  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostWithoutImage),
      switchMap(({ postDraft }) =>
        this.postsService.createPost(postDraft).pipe(
          tap((x) => console.log(x)),
          map((post) => PostsActions.createPostWithoutImageSuccess({ post })),
          catchError((error: string) => {
            console.log(error);
            return of(PostsActions.createPostWithoutImageFailure({ error }));
          })
        )
      )
    )
  );

  // ROUTING AFTER SUCCESS
  createPostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostWithoutImageSuccess),
      map(() =>
        RouterActions.navigate({
          commands: ['/home'],
          extras: { replaceUrl: true },
        })
      )
    )
  );

  giveLikeToPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.giveLikeToPost),
      switchMap(({ postId }) =>
        this.postsService.giveLikeToPost(postId).pipe(
          tap((x) => console.log(x)),
          map((like) => PostsActions.giveLikeToPostSuccess({ like })),
          catchError((error: string) => {
            console.log(error);
            return of(PostsActions.giveLikeToPostFailure({ error }));
          })
        )
      )
    )
  );

  removeLikeFromPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.removeLikeFromPost),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      switchMap(([{postId}, userId]) => {
        if (userId === undefined) {
          return of(
            PostsActions.removeLikeFromPostFailure({ error: 'no user ID' })
          );
        }

        return this.postsService.removeLikeFromPost(postId, userId).pipe(
          map(() => PostsActions.removeLikeFromPostSuccess()),
          catchError((error: any) =>
            of(PostsActions.removeLikeFromPostFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
}
