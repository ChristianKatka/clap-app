import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { Post } from '@shared/models/post.model';

import { Observable } from 'rxjs';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import {
  PostCommentActions,
  PostLikeActions,
  PostsActions,
} from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import {
  PostsSelectors,
  PostsUiSelectors,
} from 'src/PostsStore/store/selectors';

@Component({
  templateUrl: 'post.container.html',
  styleUrls: ['post.container.scss'],
})
export class PostContainerComponent implements OnInit, OnDestroy {
  selectedPost$: Observable<Post> = this.store.select(
    PostsSelectors.getSelectedPost
  );
  myProfileImage$: Observable<string> = this.store.select(
    MyProfileSelectors.getMyProfileImage
  );
  isAddCommentClicked$: Observable<boolean> = this.store.select(
    PostsUiSelectors.isAddCommentClicked
  );

  postId: string | undefined;

  constructor(
    private store: Store<PostsExtendedAppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('postId');
    if (!postId) return;
    this.postId = postId;
    this.store.dispatch(PostsActions.selectPost({ postId }));
  }
  ngOnDestroy() {
    this.store.dispatch(PostsActions.clearPostSelection());
  }

  onCreateCommentToPost(text: string) {
    if (!this.postId) return;
    this.store.dispatch(
      PostCommentActions.createCommentToPostWithoutId({
        postId: this.postId,
        text,
      })
    );
  }

  onGiveLikeToPost(post: Post) {
    this.store.dispatch(
      PostLikeActions.giveLikeToPostWithoutId({ postId: post.id })
    );
  }

  onRemoveLikeFromPost(like: PostLike | PostLikeDraft) {
    this.store.dispatch(PostLikeActions.removeLikeFromPost({ like }));
  }
}
