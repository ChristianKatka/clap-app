import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { Post } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-post-without-image',
  templateUrl: 'post-without-image.component.html',
  styleUrls: ['post-without-image.component.scss'],
})
export class PostWithoutImageComponent implements OnInit {
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

  onRemoveLikeFromPost(
    likeId: string,
    postLikes: PostLike[] | PostLikeDraft[]
  ) {
    const postLike: PostLike | PostLikeDraft = postLikes.filter(
      (postLike) => postLike.id === likeId
    )[0];
    this.removeLikeFromPost.emit(postLike);
  }
}
