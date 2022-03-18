import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import { CommentUI } from '@shared/models/comment-ui.model';
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
export class PostCommentsComponent {
  @ViewChild('afterLastCommentElement') afterLastCommentElement: Element =
    {} as Element;

  @Input()
  comments: (PostComment | PostCommentDraft)[] = [];
  @Input()
  newComments: PostComment[] = [];
  @Input()
  commentUIStatus: CommentUI | null = null;

  @Output()
  giveLikeToComment: EventEmitter<PostComment> = new EventEmitter();

  @Output()
  removeLikeFromComment: EventEmitter<CommentLike | CommentLikeDraft> =
    new EventEmitter();

  @Output()
  hideNewCommentsBelowPopUp = new EventEmitter();

  // constructor(private ref: ElementRef) {}

  previousScrollPosition = 0;
  @HostListener('window:scroll', [])
  onScroll(): void {
    // console.log(lastItemOnArrayAkaNewestComment);
    // console.log(this.afterLastCommentElement);

    // vois olla 43
    // console.log(this.afterLastCommentElement.nativeElement.clientHeight);

    // Sijainti
    // console.log(this.afterLastCommentElement.nativeElement.offsetTop)
    let top = window.pageYOffset;
    // console.log(top);

    // console.log(lastItemOnArrayAkaNewestComment.nativeElement.offsetTop);
    // console.log(window.scrollY);

    // console.log('sc');
    // if (this.newCommentsDivider) {
    //   console.log(this.newCommentsDivider.nativeElement);
    // }

    // if (this.previousScrollPosition < window.scrollY) {
    //   this.hideNewCommentsBelowPopUp.emit();
    // }

    // this.previousScrollPosition = window.scrollY;
  }

  isTypePostComment(
    comment: PostComment | PostCommentDraft
  ): comment is PostComment {
    return (<PostComment>comment).createdAt !== undefined;
  }
}
