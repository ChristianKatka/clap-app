import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { delay, of, catchError } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { v4 as uuid } from 'uuid';
import {
  PendingPostLikeActions,
  PostCommentActions,
  PostLikeActions,
} from '../actions';
import { PendingSelectors } from '../selectors';
import { PostsService } from 'src/PostsStore/services/posts.service';

@Injectable()
export class PostCommentEffects {
  createCommentToPostWithoutId = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCommentActions.createCommentToPostWithoutId),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyProfileImage)),
      switchMap(([[{ postId, text }], likersProfileImage]) => {
        return of(
          PostCommentActions.createCommentToPost({
            postCommentDraft: { id: uuid(), likersProfileImage, postId, text },
          })
        );
      })
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
