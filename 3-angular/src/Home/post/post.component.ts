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
} from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { Post } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges, AfterViewChecked {
  // @ViewChild('element') private ref: ElementRef = new ElementRef('');

  @Input()
  post: Post | null = null;
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

  newCommentHappened = false;

  constructor(private ref: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.post) return;
    if (changes['post']) {
      this.newCommentHappened = true;
    }
  }
  ngAfterViewChecked(): void {
    if (this.newCommentHappened) {
      this.scrollBottomOfPage();
      this.newCommentHappened = false;
    }
  }

  scrollBottomOfPage() {
    // console.log(this.ref.nativeElement.scrollTop);
    // console.log(this.ref.nativeElement.scrollHeight);

    try {
      this.ref.nativeElement.scrollTop = this.ref.nativeElement.scrollHeight;
    } catch (err) {}
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
}
