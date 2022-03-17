import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithMediaDraftToDb } from '@shared/models/post-with-media.model';
import { PostDraft } from '@shared/models/post.model';
import { CreatePostWithImageControllerService } from 'src/PostsStore/services/create-post-with-image-controller.service';
import { CameraActions, PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import {
  CameraSelectors,
  PostsSelectors,
} from 'src/PostsStore/store/selectors';
import { v4 as uuid } from 'uuid';

@Component({
  templateUrl: 'create-post.container.html',
  styleUrls: ['create-post.container.scss'],
})
export class CreatePostContainerComponent {
  isCameraOpen$ = this.store.select(CameraSelectors.isCameraOpen);
  loading$ = this.store.select(PostsSelectors.isLoading);

  constructor(
    private store: Store<PostsExtendedAppState>,
    private createPostWithImageControllerService: CreatePostWithImageControllerService
  ) {}

  openCamera() {
    this.store.dispatch(CameraActions.openCamera());
  }
  closeCamera() {
    this.store.dispatch(CameraActions.closeCamera());
  }

  onCreatePostWithMedia(post: {
    media: File;
    text: string;
    postLocation: string;
  }) {
    const postWithMediaDraftToDb: PostWithMediaDraftToDb = {
      id: uuid(),
      text: post.text,
      postLocation: post.postLocation,
      mimeType: post.media.type,
    };
    this.createPostWithImageControllerService.createPostWithImage(
      postWithMediaDraftToDb,
      post.media
    );
  }

  onCreatePost(post: PostDraft) {
    const postDraftToDb: PostDraft = post;
    this.store.dispatch(PostsActions.createPost({ postDraftToDb }));
  }
}
