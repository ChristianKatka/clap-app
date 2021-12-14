import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clap-app-post-add-comment',
  templateUrl: 'post-add-comment.component.html',
  styleUrls: ['post-add-comment.component.scss'],
})
export class PostAddCommentComponent implements OnInit {
  @Input()
  myProfileImage: string | null = null;

  @Input()
  postId: string | null = null;

  @Output()
  clickedAddComment = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
