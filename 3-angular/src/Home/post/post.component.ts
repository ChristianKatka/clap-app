import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import { PostComment } from '@shared/models/post-comment.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithMedia } from '@shared/models/post-with-media.model';
import { Post } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges, AfterViewChecked {
  @ViewChild('scroll') private scroll: ElementRef = {} as ElementRef;

  @Input()
  post: Post | PostWithMedia | null = null;
  @Input()
  myProfileImage: string | null = null;

  @Input()
  isAddCommentClicked = false;

  @Output()
  createCommentToPost: EventEmitter<string> = new EventEmitter();

  @Output()
  giveLikeToPost: EventEmitter<Post> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<PostLike | PostLikeDraft> =
    new EventEmitter();

  @Output()
  giveLikeToComment: EventEmitter<PostComment> = new EventEmitter();

  @Output()
  removeLikeFromComment: EventEmitter<CommentLike | CommentLikeDraft> =
    new EventEmitter();

  newCommentHappened = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.post) return;
    if (changes['post']) {
      this.newCommentHappened = true;
    }
  }
  ngAfterViewChecked(): void {
    if (this.newCommentHappened) {
      this.scrollBottom();
      this.newCommentHappened = false;
    }
  }

  onRemoveLikeFromPost(
    likeId: string,
    postLikes: PostLike[] | PostLikeDraft[]
  ) {
    const postLike: PostLike | PostLikeDraft = postLikes.filter(
      (postLike) => postLike.id === likeId
    )[0];
    this.removeLikeFromPost.emit(postLike);
  }

  isMediaPost(post: Post | PostWithMedia): post is PostWithMedia {
    return (<PostWithMedia>post).mediaUrl !== undefined;
  }

  scrollBottom() {
    console.log('scrollBottom');
    try {
      this.scroll.nativeElement.scrollTop =
        this.scroll.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
