import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { PostsSelectors } from 'src/PostsStore/store/selectors';

@Component({
  templateUrl: 'create-post.container.html',
  styleUrls: ['create-post.container.scss'],
})
export class CreatePostContainerComponent implements OnInit {
  loading$ = this.store.select(PostsSelectors.isLoading);

  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onCreatePost(text: string) {
    const postDraft: PostWithoutImageDraft = { text, postType: 'withoutImage' };
    this.store.dispatch(PostsActions.createPostWithoutImage({ postDraft }));
  }
}
