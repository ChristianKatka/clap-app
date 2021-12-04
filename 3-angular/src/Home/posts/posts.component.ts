import { Component, Input, OnInit } from '@angular/core';
import { PostWithoutImage } from '@shared/models/post-without-image.model';

@Component({
  selector: 'clap-app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input()
  postsWithoutImage: PostWithoutImage[] | [] = [];

  constructor() {}

  ngOnInit() {}
}
