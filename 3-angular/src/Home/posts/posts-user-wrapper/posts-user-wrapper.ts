import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-posts-user-wrapper',
  templateUrl: 'posts-user-wrapper.html',
  styleUrls: ['posts-user-wrapper.scss'],
})
export class PostsUserWrapperComponent implements OnInit {
  @Input()
  nickname = '';

  @Input()
  creatorsProfileImage = '';
  
  constructor() {}

  ngOnInit() {}
}
