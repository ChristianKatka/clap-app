import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { Post } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input()
  posts: Post[] | [] = [];
  @Input()
  myProfileImage: string | null = null;

  @Output()
  clickedAddComment = new EventEmitter();
  @Output()
  giveLikeToPost: EventEmitter<Post> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<PostLike | PostLikeDraft> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
