import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentLike, CommentLikeDraft } from '@shared/models/comment-like.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { CommentLikesDialogComponent } from 'src/Post/comment-likes-dialog/comment-likes-dialog.component';
import { PostLikesDialogComponent } from 'src/Post/post-likes-dialog/post-likes-dialog.component';

@Injectable({ providedIn: 'root' })
export class PostDialogService {
  constructor(private dialog: MatDialog) {}

  openPostLikesDialog(postLikes: (PostLikeDraft | PostLike)[]) {
    this.dialog.open(PostLikesDialogComponent, {
      data: postLikes,
      maxWidth: '100vw',
      panelClass: 'media-dialog',
    });
  }

  openCommentLikesDialog(commentLikes: (CommentLikeDraft | CommentLike)[]) {
    this.dialog.open(CommentLikesDialogComponent, {
      data: commentLikes,
      maxWidth: '100vw',
      panelClass: 'media-dialog',
    });
  }
}
