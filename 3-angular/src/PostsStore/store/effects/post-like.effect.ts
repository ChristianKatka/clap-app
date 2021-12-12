import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { v4 as uuid } from 'uuid';
import { PendingActions, PostsActions } from '../actions';
import { PendingSelectors } from '../selectors';

@Injectable()
export class PostLikeEffects {
  createLikeDraft = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.giveLikeToPostWithoutId),
      withLatestFrom(
        this.store.select(PendingSelectors.getLikesThatIhaveAlreadyGiven)
      ),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      switchMap(([[{ postId }, alreadyGivenLikes], userId]) => {
        if (!userId)
          return of(PostsActions.giveLikeToPostFailure({ error: 'no userId' }));
        const iHaveAlreadyLikedThisPost = alreadyGivenLikes.filter(
          (alreadyGivenLike) =>
            alreadyGivenLike.postId === postId &&
            alreadyGivenLike.userId === userId
        )[0];

        if (iHaveAlreadyLikedThisPost) {
          return of(
            PostsActions.giveLikeToPost({
              postLikeDraft: iHaveAlreadyLikedThisPost,
            })
          );
        }

        return of(
          PostsActions.giveLikeToPost({
            postLikeDraft: { id: uuid(), postId, userId },
          })
        );
      })
    )
  );

  giveLikeToPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.giveLikeToPost),
      delay(3000),
      switchMap(({ postLikeDraft }) => {
        console.log(postLikeDraft);

        return of(PendingActions.resolvePendingPostLike({ postLikeDraft }));
      })
    )
  );

  removeLikeFromPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.removeLikeFromPost),
      delay(3000),
      map(({ like }) =>
        PendingActions.resolveRemoveLikeFromPost({ likeId: like.id })
      )
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
