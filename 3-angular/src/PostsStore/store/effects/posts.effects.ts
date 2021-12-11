import { Injectable } from '@angular/core';
import { RouterActions } from '@app/store/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { PendingActions, PostsActions } from '../actions';
import { PendingSelectors } from '../selectors';
import { v4 as uuid } from 'uuid';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';

@Injectable()
export class PostsEffects {
  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostWithoutImage),
      switchMap(({ postDraft }) =>
        this.postsService.createPost(postDraft).pipe(
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
      delay(6000),
      switchMap(({ postLikeDraft }) => {
        console.log(postLikeDraft);

        return of(PendingActions.resolvePendingPostLike({ postLikeDraft }));
      })
    )
  );

  removeLikeFromPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.removeLikeFromPost),
      delay(6000),
      map(({ like }) =>
        PendingActions.resolveRemoveLikeFromPost({ likeId: like.id })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
}
