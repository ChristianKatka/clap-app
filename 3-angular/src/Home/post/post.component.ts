import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';

@Component({
  selector: 'clap-app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent {
  @Input()
  post: any;
  @Input()
  myProfileImage: string | null = null;

  @Input()
  isAddCommentClicked = false;

  

  @Output()
  giveLikeToPost: EventEmitter<PostWithoutImage> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<PostLike | PostLikeDraft> =
    new EventEmitter();

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
