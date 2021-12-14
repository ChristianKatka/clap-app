import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-post-comments-minified',
  templateUrl: 'post-comments-minified.component.html',
  styleUrls: ['post-comments-minified.component.scss'],
})
export class PostCommentsMinifiedComponent implements OnInit {
  @Input()
  comments: any;
  constructor() {}

  ngOnInit() {}
}
