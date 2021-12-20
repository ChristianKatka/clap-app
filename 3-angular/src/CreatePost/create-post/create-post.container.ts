import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { CreatePostWithImageControllerService } from 'src/PostsStore/services/create-post-with-image-controller.service';
import { PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { PostsSelectors } from 'src/PostsStore/store/selectors';
import { v4 as uuid } from 'uuid';

@Component({
  templateUrl: 'create-post.container.html',
  styleUrls: ['create-post.container.scss'],
})
export class CreatePostContainerComponent implements OnInit {
  loading$ = this.store.select(PostsSelectors.isLoading);

  constructor(
    private store: Store<PostsExtendedAppState>,
    private createPostWithImageControllerService: CreatePostWithImageControllerService
  ) {}

  ngOnInit() {}

  onCreatePostWithImage(post: { image: File; text: string }) {
    console.log('onCreatePostWithImage');
    const postDraft: PostWithImageDraft = {
      id: uuid(),
      image: post.image,
      imageName: post.image.name,
      mimeType: post.image.type,
      text: post.text,
      postType: 'withImage',
      iLikeThisPost: undefined,
      postLikes: [],
    };
    this.createPostWithImageControllerService.createPostWithImage(postDraft)
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
