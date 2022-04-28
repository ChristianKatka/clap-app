import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';

@Component({
  selector: 'clap-app-comment-likes-dialog',
  templateUrl: 'comment-likes-dialog.component.html',
  styleUrls: ['comment-likes-dialog.component.scss'],
})
export class CommentLikesDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public commentLikes: (CommentLikeDraft | CommentLike)[],
    public dialogRef: MatDialogRef<CommentLikesDialogComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  isTypePostLike(like: CommentLikeDraft | CommentLike): like is CommentLike {
    return (<CommentLike>like).likersProfileImage !== undefined;
  }
}
