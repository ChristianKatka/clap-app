import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import {
  PostComment,
  PostCommentDraft,
} from '@shared/models/post-comment.model';

@Component({
  selector: 'clap-app-comment-like-button',
  templateUrl: 'comment-like-button.component.html',
  styleUrls: ['comment-like-button.component.scss'],
})
export class CommentLikeButtonComponent {
  @Input()
  comment: PostComment | PostCommentDraft | null = null;

  @Output()
  giveLikeToComment: EventEmitter<PostComment> = new EventEmitter();

  @Output()
  removeLikeFromComment: EventEmitter<CommentLike | CommentLikeDraft> =
    new EventEmitter();

  isTypePostComment(
    comment: PostComment | PostCommentDraft
  ): comment is PostComment {
    return (<PostComment>comment).createdAt !== undefined;
  }

  onRemoveLikeFromComment(
    likeId: string,
    commentLikes: (CommentLike | CommentLikeDraft)[]
  ) {
    const commentLike: CommentLike | CommentLikeDraft = commentLikes.filter(
      (commentLike) => commentLike.id === likeId
    )[0];

    this.removeLikeFromComment.emit(commentLike);
  }
}
