import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostWithoutImage } from '@shared/models/post-without-image.model';

@Component({
  selector: 'clap-app-post-without-image',
  templateUrl: 'post-without-image.component.html',
  styleUrls: ['post-without-image.component.scss'],
})
export class PostWithoutImageComponent implements OnInit {
  @Input()
  postsWithoutImage: PostWithoutImage[] | [] = [];
  @Input()
  loading = false;

  @Output()
  giveLikeToPost: EventEmitter<string> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<string> = new EventEmitter();

  like = false;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.like = !this.like;
  }
}
