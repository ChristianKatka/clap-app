import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { Observable } from 'rxjs';
import { PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import {
  PostsMySelectors,
  PostsSelectors,
} from 'src/PostsStore/store/selectors';

@Component({
  templateUrl: 'my-profile-posts.container.html',
  styleUrls: ['my-profile-posts.container.scss'],
})
export class MyProfilePostsContainerComponent implements OnInit {
  myPosts$: Observable<PostWithoutImage[]> = this.store.select(
    PostsMySelectors.getMyOwnPosts
  );

  loading$: Observable<boolean> = this.store.select(PostsSelectors.isLoading);

  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onGiveLikeToPost(postId: string) {
    this.store.dispatch(PostsActions.giveLikeToPost({ postId }));
  }

  onRemoveLikeFromPost(likeId: string) {
    this.store.dispatch(PostsActions.removeLikeFromPost({ likeId }));
  }
}
