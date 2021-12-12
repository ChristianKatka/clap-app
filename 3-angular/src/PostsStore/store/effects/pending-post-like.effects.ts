import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { PendingPostLikeActions, PostLikeActions } from '../actions';
import { PendingSelectors } from '../selectors';

@Injectable()
export class PendingPostLikeEffects {
  resolvePendingPostLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingPostLikeActions.resolvePendingPostLike),
      withLatestFrom(this.store.select(PendingSelectors.getPendingPostLikes)),
      switchMap(([{ postLikeDraft }, pendingPostLike]) => {
        if (pendingPostLike[postLikeDraft.id]) {
          return this.postsService
            .giveLikeToPost(postLikeDraft.postId, postLikeDraft.id)
            .pipe(
              map((like) => PostLikeActions.giveLikeToPostSuccess({ like })),
              catchError((error: string) => {
                console.log(error);
                return of(PostLikeActions.giveLikeToPostFailure({ error }));
              })
            );
        } else {
          return of(PendingPostLikeActions.nothingToResolve());
        }
      })
    )
  );

  resolvePendingRemoveLikeFromPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingPostLikeActions.resolvePendingRemoveLikeFromPost),
      withLatestFrom(
        this.store.select(PendingSelectors.getPendingRemovePostLikes)
      ),
      switchMap(([{ likeId }, pendingRemovePostLike]) => {
        if (pendingRemovePostLike[likeId]) {
          return this.postsService.removeLikeFromPost(likeId).pipe(
            map(({ likeId }) =>
              PostLikeActions.removeLikeFromPostSuccess({ likeId })
            ),
            catchError((error: string) => {
              console.log(error);
              return of(PostLikeActions.removeLikeFromPostFailure({ error }));
            })
          );
        } else {
          return of(PendingPostLikeActions.nothingToResolve());
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
