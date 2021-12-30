import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostComment } from '@shared/models/post-comment.model';

@Component({
  selector: 'clap-app-post-comments',
  templateUrl: 'post-comments.component.html',
  styleUrls: ['post-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {
  @Input()
  comments: any;

  @Input()
  newComments: PostComment[] = [];

  constructor() {}
}
