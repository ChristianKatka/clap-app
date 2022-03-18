import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithMedia } from '@shared/models/post-with-media.model';
import { Post } from '@shared/models/post.model';
import { Observable } from 'rxjs';
import { PostLikeActions, PostsUiActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { PostsMySelectors } from 'src/PostsStore/store/selectors';
import { MyProfileSelectors } from '../store/selectors';

@Component({
  templateUrl: 'my-profile-posts.container.html',
  styleUrls: ['my-profile-posts.container.scss'],
})
export class MyProfilePostsContainerComponent implements OnInit {
  myPosts$: Observable<(Post | PostWithMedia)[]> = this.store.select(
    PostsMySelectors.getMyOwnPosts
  );

  myProfileImage$: Observable<string> = this.store.select(
    MyProfileSelectors.getMyProfileImage
  );

  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

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
}
