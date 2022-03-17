import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostDraft } from '@shared/models/post.model';

@Component({
  selector: 'clap-app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input()
  loading = false;

  @Input()
  isCameraOpen = false;

  @Output()
  createPost: EventEmitter<PostDraft> = new EventEmitter();

  @Output()
  createPostWithMedia: EventEmitter<{
    media: File;
    text: string;
    postLocation: string;
  }> = new EventEmitter();

  @Output()
  postImageSelected: EventEmitter<File> = new EventEmitter();

  @Output()
  openCamera = new EventEmitter();

  @Output()
  closeCamera = new EventEmitter();

  mediaSelected: File | undefined;

  constructor() {}

  ngOnInit() {}

  holdPostMedia(media: File) {
    if (this.isCameraOpen) {
      this.closeCamera.emit();
    }

    this.mediaSelected = media;
  }

  onCreatePost(post: PostDraft) {
    if (this.mediaSelected) {
      const postWithMedia = {
        media: this.mediaSelected,
        text: post.text,
        postLocation: post.postLocation,
      };
      this.createPostWithMedia.emit(postWithMedia);
    } else {
      this.createPost.emit(post);
    }
  }
}
