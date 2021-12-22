import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'clap-app-post-comments',
  templateUrl: 'post-comments.component.html',
  styleUrls: ['post-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {
  @Input()
  comments: any;

  constructor() {}
}
