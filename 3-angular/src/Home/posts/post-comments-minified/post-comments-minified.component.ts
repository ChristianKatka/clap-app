import { Component, Input } from '@angular/core';

@Component({
  selector: 'clap-app-post-comments-minified',
  templateUrl: 'post-comments-minified.component.html',
  styleUrls: ['post-comments-minified.component.scss'],
})
export class PostCommentsMinifiedComponent {
  @Input()
  comments: any;

  @Input()
  postId = '';

  constructor() {}
}
