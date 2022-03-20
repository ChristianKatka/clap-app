import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';

@Component({
  selector: 'clap-app-likes-dialog',
  templateUrl: 'likes-dialog.component.html',
  styleUrls: ['likes-dialog.component.scss'],
})
export class LikesDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public postLikes: (PostLikeDraft | PostLike)[],
    public dialogRef: MatDialogRef<LikesDialogComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  isTypePostLike(like: PostLikeDraft | PostLike): like is PostLike {
    return (<PostLike>like).likersProfileImage !== undefined;
  }
}
