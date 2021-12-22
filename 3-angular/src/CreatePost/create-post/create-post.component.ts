import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clap-app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  mediaSelected: File | undefined;
  @Input()
  loading = false;

  @Output()
  createPost: EventEmitter<string> = new EventEmitter();

  @Output()
  createPostWithMedia: EventEmitter<{ media: File; text: string }> =
    new EventEmitter();

  @Output()
  postImageSelected: EventEmitter<File> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  holdPostMedia(media: File) {
    this.mediaSelected = media;
  }

  onCreatePost(text: string) {
    if (this.mediaSelected) {
      const postWithMedia = { media: this.mediaSelected, text };
      this.createPostWithMedia.emit(postWithMedia);
    } else {
      this.createPost.emit(text);
    }
  }
}
