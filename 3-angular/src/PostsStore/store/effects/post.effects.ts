import { Injectable } from '@angular/core';
import { RouterActions } from '@app/store/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { PostsActions } from '../actions';

@Injectable()
export class PostEffects {
  createPostWithoutImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostWithoutImage),
      switchMap(({ postDraft }) =>
        this.postsService.createPost(postDraft).pipe(
          map((post) => PostsActions.createPostWithoutImageSuccess({ post })),
          catchError((error: string) => {
            console.log(error);
            return of(
              PostsActions.createPostWithoutImageFailure({
                error: 'error creating post without image',
              })
            );
          })
        )
      )
    )
  );

  createPostWithoutImageSuccess$ = createEffect(() =>
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

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
}
