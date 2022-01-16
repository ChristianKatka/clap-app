import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, delay } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { PostsService } from 'src/PostsStore/services/posts.service';
import { v4 as uuid } from 'uuid';
import { PostCommentActions, PostCommentUIActions } from '../actions';

@Injectable()
export class PostCommentEffects {
  createCommentToPostWithoutId = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCommentActions.createCommentToPostWithoutId),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyProfile)),
      switchMap(([{ postId, text }, { profileImageUrl, nickname }]) => {
        if (!nickname)
          return of(
            PostCommentActions.createCommentToPostFailure({
              error: 'no nickname',
            })
          );
        return of(
          PostCommentActions.createCommentToPost({
            postCommentDraft: {
              id: uuid(),
              commentersProfileImage: profileImageUrl,
              nickname,
              postId,
              text,
            },
          })
        );
      })
    )
  );

  scrollToBottomAftercreateCommentToPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCommentActions.createCommentToPost),
      delay(100),
      switchMap(() => of(PostCommentUIActions.iCreatedNewComment()))
    )
  );

  createCommentToPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCommentActions.createCommentToPost),
      switchMap(({ postCommentDraft }) =>
        this.postsService.createCommentToPost(postCommentDraft).pipe(
          map((postComment) =>
            PostCommentActions.createCommentToPostSuccess({
              postComment,
            })
          ),
          catchError(() =>
            of(
              PostCommentActions.createCommentToPostFailure({
                error: 'Error adding comment to post',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsService
  ) {}
}
