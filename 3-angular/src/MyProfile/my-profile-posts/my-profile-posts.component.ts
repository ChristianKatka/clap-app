import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-my-profile-posts',
  templateUrl: 'my-profile-posts.component.html',
  styleUrls: ['my-profile-posts.component.scss'],
})
export class MyProfilePostsComponent implements OnInit {
  @Input()
  myPosts: Post[] | [] = [];
  @Input()
  loading = false;

  @Output()
  giveLikeToPost: EventEmitter<string> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
