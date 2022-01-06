import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, tap } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { CommentLikeActions, PendingCommentLikeActions } from '../actions';
import { PendingSelectors } from '../selectors';

@Injectable()
export class PendingCommentLikeEffects {
  resolvePendingCommentLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingCommentLikeActions.resolvePendingCommentLike),
      withLatestFrom(
        this.store.select(PendingSelectors.getPendingCommentLikes)
      ),
      switchMap(([{ commentLikeDraft }, pendingCommentLike]) => {
        if (pendingCommentLike[commentLikeDraft.id]) {
          return this.postsService
            .giveLikeToComment(commentLikeDraft.commentId, commentLikeDraft.id)
            .pipe(
              tap((x) => console.log(x)),
              map((like) =>
                CommentLikeActions.giveLikeToCommentSuccess({ like })
              ),
              catchError((error: string) => {
                console.log(error);
                return of(
                  CommentLikeActions.giveLikeToCommentFailure({ error })
                );
              })
            );
        } else {
          return of(PendingCommentLikeActions.nothingToResolve());
        }
      })
    )
  );

  resolvePendingRemoveLikeFromComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingCommentLikeActions.resolvePendingRemoveLikeFromComment),
      withLatestFrom(
        this.store.select(PendingSelectors.getPendingRemoveCommentLikes)
      ),
      switchMap(([{ likeId }, pendingRemoveCommentLike]) => {
        if (pendingRemoveCommentLike[likeId]) {
          return this.postsService.removeLikeFromComment(likeId).pipe(
            map(({ likeId }) =>
              CommentLikeActions.removeLikeFromCommentSuccess({ likeId })
            ),
            catchError((error: string) => {
              console.log(error);
              return of(
                CommentLikeActions.removeLikeFromCommentFailure({ error })
              );
            })
          );
        } else {
          return of(PendingCommentLikeActions.nothingToResolve());
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
