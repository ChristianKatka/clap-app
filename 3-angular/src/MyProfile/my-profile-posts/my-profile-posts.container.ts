import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '@shared/models/post.model';

import { Observable } from 'rxjs';
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
  myPosts$: Observable<Post[]> = this.store.select(
    PostsMySelectors.getMyOwnPosts
  );

  loading$: Observable<boolean> = this.store.select(PostsSelectors.isLoading);

  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onGiveLikeToPost(postId: string) {
    console.log('FIX');

    // this.store.dispatch(PostsActions.giveLikeToPost({ postId }));
  }

  onRemoveLikeFromPost(likeId: string) {
    // this.store.dispatch(PostsActions.removeLikeFromPost({ likeId }));
  }
}
