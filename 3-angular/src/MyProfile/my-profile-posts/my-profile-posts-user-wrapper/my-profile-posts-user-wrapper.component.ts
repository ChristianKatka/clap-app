import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-my-profile-posts-user-wrapper',
  templateUrl: 'my-profile-posts-user-wrapper.component.html',
  styleUrls: ['my-profile-posts-user-wrapper.component.scss'],
})
export class MyProfilePostsUserWrapperComponent implements OnInit {
  @Input()
  nickname = '';

  constructor() {}

  ngOnInit() {}
}
