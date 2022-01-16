import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostCommentActions, PostCommentUIActions } from '../actions';

@Injectable()
export class PostCommentUIEffects {
  newPostCommentHappenedViaSocket = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCommentActions.newPostCommentHappenedViaSocket),
      switchMap(() => of(PostCommentUIActions.showNewMessagesBelowPopUp()))
    )
  );

  constructor(private actions$: Actions) {}
}
