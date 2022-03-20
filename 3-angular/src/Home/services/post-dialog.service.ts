import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { LikesDialogComponent } from 'src/Post/likes-dialog/likes-dialog.component';

@Injectable({ providedIn: 'root' })
export class PostDialogService {
  constructor(private dialog: MatDialog) {}

  openLikesDialog(postLikes: (PostLikeDraft | PostLike)[]) {
    this.dialog.open(LikesDialogComponent, {
      data: postLikes,
      maxWidth: '100vw',
      panelClass: 'media-dialog',
    });
  }
}
