import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-post-comments',
  templateUrl: 'post-comments.component.html',
  styleUrls: ['post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input()
  comments: any;

  constructor() {}

  ngOnInit() {}
}
