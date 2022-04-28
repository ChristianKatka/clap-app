import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithMedia } from '@shared/models/post-with-media.model';
import { Post } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
})
export class PostsComponent {
  @Input()
  posts: (Post | PostWithMedia)[] = [];
  @Input()
  myProfileImage: string | null = null;

  @Output()
  clickedAddComment = new EventEmitter();
  @Output()
  giveLikeToPost: EventEmitter<Post> = new EventEmitter();
  @Output()
  removeLikeFromPost: EventEmitter<PostLike | PostLikeDraft> =
    new EventEmitter();

  @Output()
  openPostLikesDialog: EventEmitter<(PostLikeDraft | PostLike)[]> =
    new EventEmitter();

  @Output()
  openCommentLikesDialog = new EventEmitter();

  onRemoveLikeFromPost(
    likeId: string,
    postLikes: PostLike[] | PostLikeDraft[]
  ) {
    const postLike: PostLike | PostLikeDraft = postLikes.filter(
      (postLike) => postLike.id === likeId
    )[0];
    this.removeLikeFromPost.emit(postLike);
  }

  isMediaPost(post: Post | PostWithMedia): post is PostWithMedia {
    return (<PostWithMedia>post).mediaUrl !== undefined;
  }
}
