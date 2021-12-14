import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
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
  myProfileImage: string | null = null;
  @Input()
  comments: any;


  @Output()
  clickedAddComment = new EventEmitter();
  @Output()
  giveLikeToPost: EventEmitter<PostWithoutImage> = new EventEmitter();
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
