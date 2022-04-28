import { Component } from '@angular/core';
import { PostDialogService } from '@home/services/post-dialog.service';
import { Store } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithMedia } from '@shared/models/post-with-media.model';
import { Post } from '@shared/models/post.model';
import { Observable } from 'rxjs';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { PostLikeActions, PostsUiActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { PostsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  selector: 'clap-app-posts-container',
  templateUrl: 'posts.container.html',
  styleUrls: ['posts.container.scss'],
})
export class PostsContainerComponent {
  posts$: Observable<(Post | PostWithMedia)[]> = this.store.select(
    PostsSelectors.getPosts
  );

  myProfileImage$: Observable<string> = this.store.select(
    MyProfileSelectors.getMyProfileImage
  );

  constructor(
    private store: Store<PostsExtendedAppState>,
    private postDialogService: PostDialogService
  ) {}

  onGiveLikeToPost(post: Post) {
    this.store.dispatch(
      PostLikeActions.giveLikeToPostWithoutId({ postId: post.id })
    );
  }

  onRemoveLikeFromPost(like: PostLike | PostLikeDraft) {
    this.store.dispatch(PostLikeActions.removeLikeFromPost({ like }));
  }

  onClickedAddComment() {
    this.store.dispatch(PostsUiActions.clickedAddComment());
  }

  openPostLikesDialog(postLikes: (PostLikeDraft | PostLike)[]) {
    this.postDialogService.openPostLikesDialog(postLikes);
  }
}
