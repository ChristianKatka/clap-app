import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterActions } from '@app/store/actions';
import { PostDialogService } from '@home/services/post-dialog.service';
import { Store } from '@ngrx/store';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import { CommentUI } from '@shared/models/comment-ui.model';
import { PostComment } from '@shared/models/post-comment.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithMedia } from '@shared/models/post-with-media.model';
import { Post } from '@shared/models/post.model';
import { Observable } from 'rxjs';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import {
  CommentLikeActions,
  PostCommentActions,
  PostCommentUIActions,
  PostLikeActions,
  PostsActions,
} from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import {
  PostsCommentsUISelectors,
  PostsSelectors,
  PostsUiSelectors,
} from 'src/PostsStore/store/selectors';

@Component({
  templateUrl: 'post.container.html',
  styleUrls: ['post.container.scss'],
})
export class PostContainerComponent implements OnInit, OnDestroy {
  selectedPost$: Observable<Post | PostWithMedia> = this.store.select(
    PostsSelectors.getSelectedPost
  );
  myProfileImage$: Observable<string> = this.store.select(
    MyProfileSelectors.getMyProfileImage
  );
  isAddCommentClicked$: Observable<boolean> = this.store.select(
    PostsUiSelectors.isAddCommentClicked
  );

  postId: string | undefined;

  commentUIStatus$: Observable<CommentUI> = this.store.select(
    PostsCommentsUISelectors.getCommentUiStatus
  );

  constructor(
    private store: Store<PostsExtendedAppState>,
    private route: ActivatedRoute,
    private postDialogService: PostDialogService
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

  onGiveLikeToComment(comment: PostComment) {
    this.store.dispatch(
      CommentLikeActions.giveLikeToCommentWithoutId({ commentId: comment.id })
    );
  }

  onRemoveLikeFromComment(like: CommentLike | CommentLikeDraft) {
    this.store.dispatch(CommentLikeActions.removeLikeFromComment({ like }));
  }

  onHideNewCommentsBelowPopUp() {
    this.store.dispatch(PostCommentUIActions.hideNewMessagesBelowPopUp());
  }

  openPostLikesDialog(postLikes: (PostLikeDraft | PostLike)[]) {
    this.postDialogService.openPostLikesDialog(postLikes);
  }

  openCommentLikesDialog(commentLike: (CommentLikeDraft | CommentLike)[]) {
    this.postDialogService.openCommentLikesDialog(commentLike);
  }

  goBack() {
    this.store.dispatch(RouterActions.back());
  }
}
