import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';

@Component({
  templateUrl: 'create-post.container.html',
  styleUrls: ['create-post.container.scss'],
})
export class CreatePostContainerComponent implements OnInit {
  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onCreatePost(text: string) {
    const postDraft = { text };
    this.store.dispatch(PostsActions.createPost({ postDraft }));
  }
}
