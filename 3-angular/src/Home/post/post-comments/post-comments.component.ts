import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import {
  PostComment,
  PostCommentDraft,
} from '@shared/models/post-comment.model';

@Component({
  selector: 'clap-app-post-comments',
  templateUrl: 'post-comments.component.html',
  styleUrls: ['post-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent implements OnChanges {
  @Input()
  comments: (PostComment | PostCommentDraft)[] = [];
  @Input()
  newComments: PostComment[] = [];

  @Output()
  giveLikeToComment: EventEmitter<PostComment> = new EventEmitter();

  @Output()
  removeLikeFromComment: EventEmitter<CommentLike | CommentLikeDraft> =
    new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.comments);
  }

  isTypePostComment(
    comment: PostComment | PostCommentDraft
  ): comment is PostComment {
    return (<PostComment>comment).createdAt !== undefined;
  }
}
