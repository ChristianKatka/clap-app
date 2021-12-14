import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { Observable } from 'rxjs';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { PostLikeActions, PostsUiActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { PostsCommentsSelectors, PostsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  selector: 'clap-app-posts-container',
  templateUrl: 'posts.container.html',
  styleUrls: ['posts.container.scss'],
})
export class PostsContainerComponent implements OnInit {
  postsWithoutImage$: Observable<PostWithoutImage[]> = this.store.select(
    PostsSelectors.getPostsWithoutImage
  );

  myProfileImage$: Observable<string> = this.store.select(
    MyProfileSelectors.getMyProfileImage
  );

  comments$ = this.store.select(PostsCommentsSelectors.getPostsComments);


  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onGiveLikeToPost(post: PostWithoutImage) {
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
