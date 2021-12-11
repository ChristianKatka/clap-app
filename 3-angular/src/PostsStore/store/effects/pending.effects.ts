import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { PendingActions, PostsActions } from '../actions';
import { PendingSelectors } from '../selectors';

@Injectable()
export class PendingEffects {
  resolvePendingPostLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingActions.resolvePendingPostLike),
      withLatestFrom(this.store.select(PendingSelectors.getPendingPostLikes)),
      switchMap(([{ postLikeDraft }, pendingPostLike]) => {
        if (pendingPostLike[postLikeDraft.id]) {
          return this.postsService
            .giveLikeToPost(postLikeDraft.postId, postLikeDraft.id)
            .pipe(
              map((like) => PostsActions.giveLikeToPostSuccess({ like })),
              catchError((error: string) => {
                console.log(error);
                return of(PostsActions.giveLikeToPostFailure({ error }));
              })
            );
        } else {
          return of(PendingActions.nothingToResolve());
        }
      })
    )
  );

  resolveRemoveLikeFromPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingActions.resolveRemoveLikeFromPost),
      withLatestFrom(
        this.store.select(PendingSelectors.getPendingRemovePostLikes)
      ),
      switchMap(([{ likeId }, pendingRemovePostLike]) => {
        if (pendingRemovePostLike[likeId]) {
          return this.postsService.removeLikeFromPost(likeId).pipe(
            map(({ likeId }) =>
              PostsActions.removeLikeFromPostSuccess({ likeId })
            ),
            catchError((error: string) => {
              console.log(error);
              return of(PostsActions.removeLikeFromPostFailure({ error }));
            })
          );
        } else {
          return of(PendingActions.nothingToResolve());
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
}
