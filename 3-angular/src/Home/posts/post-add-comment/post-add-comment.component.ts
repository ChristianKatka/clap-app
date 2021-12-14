import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-post-add-comment',
  templateUrl: 'post-add-comment.component.html',
  styleUrls: ['post-add-comment.component.scss'],
})
export class PostAddCommentComponent implements OnInit {
  @Input()
  myProfileImage: string | null = null;

  constructor() {}

  ngOnInit() {}
}
