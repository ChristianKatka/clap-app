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

  onCreatePostWithImage(post: { image: File; text: string }) {
    console.log('onCreatePostWithImage');

    console.log(post);

    // const postDraft: PostWithoutImageDraft = {
    //   text,
    //   postType: 'withoutImage',
    //   iLikeThisPost: undefined,
    //   postLikes: [],
    // };
    // this.store.dispatch(PostsActions.createPostWithoutImage({ postDraft }));
  }

  onCreatePostWithoutImage(text: string) {
    console.log('onCreatePostWithoutImage');

    console.log(text);
    // const postDraft: PostWithoutImageDraft = {
    //   text,
    //   postType: 'withoutImage',
    //   iLikeThisPost: undefined,
    //   postLikes: [],
    // };
    // this.store.dispatch(PostsActions.createPostWithoutImage({ postDraft }));
  }
}
