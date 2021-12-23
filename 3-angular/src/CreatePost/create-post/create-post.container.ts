import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostWithMediaDraftToDb } from '@shared/models/post-with-media.model';
import { PostDraft } from '@shared/models/post.model';
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

  onCreatePostWithMedia(post: { media: File; text: string }) {
    console.log('onCreatePostWithMedia');
    const postWithMediaDraftToDb: PostWithMediaDraftToDb = {
      id: uuid(),
      text: post.text,
      mimeType: post.media.type,
    };
    this.createPostWithImageControllerService.createPostWithImage(postWithMediaDraftToDb, post.media)
  }

  onCreatePost(text: string) {
    console.log('onCreatePost');

    console.log(text);
    const postDraftToDb: PostDraft = {
      text,
    };
    this.store.dispatch(PostsActions.createPost({ postDraftToDb }));
  }
}
