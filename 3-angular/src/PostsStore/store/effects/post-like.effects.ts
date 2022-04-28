import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { delay, of, debounceTime } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { v4 as uuid } from 'uuid';
import { PendingPostLikeActions, PostLikeActions } from '../actions';
import { PendingSelectors } from '../selectors';

@Injectable()
export class PostLikeEffects {
  giveLikeToPostWithoutId = createEffect(() =>
    this.actions$.pipe(
      ofType(PostLikeActions.giveLikeToPostWithoutId),
      withLatestFrom(
        this.store.select(PendingSelectors.getPostLikesThatIhaveAlreadyGiven)
      ),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      switchMap(([[{ postId }, alreadyGivenLikes], userId]) => {
        if (!userId)
          return of(
            PostLikeActions.giveLikeToPostFailure({ error: 'no userId' })
          );
        const iHaveAlreadyLikedThisPost = alreadyGivenLikes.filter(
          (alreadyGivenLike) =>
            alreadyGivenLike.postId === postId &&
            alreadyGivenLike.userId === userId
        )[0];

        if (iHaveAlreadyLikedThisPost) {
          return of(
            PostLikeActions.giveLikeToPost({
              postLikeDraft: iHaveAlreadyLikedThisPost,
            })
          );
        }

        return of(
          PostLikeActions.giveLikeToPost({
            postLikeDraft: { id: uuid(), postId, userId },
          })
        );
      })
    )
  );

  giveLikeToPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostLikeActions.giveLikeToPost),
      debounceTime(environment.pendingDelayTime),
      switchMap(({ postLikeDraft }) => {
        return of(
          PendingPostLikeActions.resolvePendingPostLike({ postLikeDraft })
        );
      })
    )
  );

  removeLikeFromPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostLikeActions.removeLikeFromPost),
      debounceTime(environment.pendingDelayTime),
      map(({ like }) =>
        PendingPostLikeActions.resolvePendingRemoveLikeFromPost({
          likeId: like.id,
        })
      )
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
