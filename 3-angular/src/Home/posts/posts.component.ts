import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostWithoutImage } from '@shared/models/post-without-image.model';

@Component({
  selector: 'clap-app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input()
  postsWithoutImage: PostWithoutImage[] | [] = [];

  @Output()
  giveLikeToPost: EventEmitter<string> = new EventEmitter();


  constructor() {}

  ngOnInit() {}
}
