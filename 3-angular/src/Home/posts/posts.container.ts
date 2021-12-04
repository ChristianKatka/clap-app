import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { Observable } from 'rxjs';
import { PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { PostsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  selector: 'clap-app-posts-container',
  templateUrl: 'posts.container.html',
  styleUrls: ['posts.container.scss'],
})
export class PostsContainerComponent implements OnInit {
  postsWithoutImage$: Observable<PostWithoutImage[]> = this.store.select(
    PostsSelectors.getPostsWithoutImage
  );

  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onGiveLikeToPost(postId: string) {
    this.store.dispatch(PostsActions.giveLikeToPost({ postId }));
  }
}
