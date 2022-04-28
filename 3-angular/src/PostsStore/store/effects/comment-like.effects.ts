import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { v4 as uuid } from 'uuid';
import { CommentLikeActions, PendingCommentLikeActions } from '../actions';
import { PendingSelectors } from '../selectors';

@Injectable()
export class CommentLikeEffects {
  giveLikeToCommentWithoutId = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentLikeActions.giveLikeToCommentWithoutId),
      withLatestFrom(
        this.store.select(PendingSelectors.getCommentLikesThatIhaveAlreadyGiven)
      ),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      switchMap(([[{ commentId }, alreadyGivenLikes], userId]) => {
        if (!userId)
          return of(
            CommentLikeActions.giveLikeToCommentFailure({ error: 'no userId' })
          );
        const iHaveAlreadyLikedThisComment = alreadyGivenLikes.filter(
          (alreadyGivenLike) =>
            alreadyGivenLike.commentId === commentId &&
            alreadyGivenLike.userId === userId
        )[0];

        if (iHaveAlreadyLikedThisComment) {
          return of(
            CommentLikeActions.giveLikeToComment({
              commentLikeDraft: iHaveAlreadyLikedThisComment,
            })
          );
        }

        return of(
          CommentLikeActions.giveLikeToComment({
            commentLikeDraft: { id: uuid(), commentId, userId },
          })
        );
      })
    )
  );

  giveLikeToComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentLikeActions.giveLikeToComment),
      debounceTime(environment.pendingDelayTime),
      switchMap(({ commentLikeDraft }) => {
        return of(
          PendingCommentLikeActions.resolvePendingCommentLike({
            commentLikeDraft,
          })
        );
      })
    )
  );

  removeLikeFromComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentLikeActions.removeLikeFromComment),
      debounceTime(environment.pendingDelayTime),
      map(({ like }) =>
        PendingCommentLikeActions.resolvePendingRemoveLikeFromComment({
          likeId: like.id,
        })
      )
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
