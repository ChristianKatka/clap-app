import { Component, Input, OnInit } from '@angular/core';
import { PostWithoutImage } from '@shared/models/post-without-image.model';

@Component({
  selector: 'clap-app-post-without-image',
  templateUrl: 'post-without-image.component.html',
  styleUrls: ['post-without-image.component.scss'],
})
export class PostWithoutImageComponent implements OnInit {
  @Input()
  postsWithoutImage: PostWithoutImage[] | [] = [];

  constructor() {}

  ngOnInit() {}
}
