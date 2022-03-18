import { Component, Input } from '@angular/core';
import {
  PostComment,
  PostCommentApiResponse,
  PostCommentDraft,
} from '@shared/models/post-comment.model';

@Component({
  selector: 'clap-app-post-comments-minified',
  templateUrl: 'post-comments-minified.component.html',
  styleUrls: ['post-comments-minified.component.scss'],
})
export class PostCommentsMinifiedComponent {
  @Input()
  comments: (PostComment | PostCommentDraft | PostCommentApiResponse)[] = [];

  @Input()
  postId = '';

  constructor() {}
}
