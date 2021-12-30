import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  // @Input()
  // comments: (PostCommentDraft | PostComment)[] = [];
  @Input()
  comments: any;
  @Input()
  newComments: PostComment[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.comments);
  }

  giveLikeToComment(comment: any) {
    console.log(comment);
  }

  // isMediaPost(post: Post | PostWithMedia): post is PostWithMedia {
  //   return (<PostWithMedia>post).mediaUrl !== undefined;
  // }
  isCommentDraft(
    comment: PostComment | PostCommentDraft
  ): comment is PostComment {
    return (<PostComment>comment).createdAt === undefined;
  }
}
