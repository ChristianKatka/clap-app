import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';

@Component({
  selector: 'clap-app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
})
export class PostsComponent implements OnInit, OnChanges {
  @Input()
  postsWithoutImage: PostWithoutImage[] | [] = [];
  @Input()
  myProfileImage: string | null = null;
  @Output()
  clickedAddComment = new EventEmitter();

  @Output()
  giveLikeToPost: EventEmitter<PostWithoutImage> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<PostLike| PostLikeDraft> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.myProfileImage);
      
  }
}
