import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'create-post.container.html',
  styleUrls: ['create-post.container.scss'],
})
export class CreatePostContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onCreatePost(text: string) {
    console.log(text);
  }
}
