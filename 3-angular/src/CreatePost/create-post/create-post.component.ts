import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clap-app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  imageSelected: File | undefined;
  @Input()
  loading = false;

  @Output()
  createPostWithoutImage: EventEmitter<string> = new EventEmitter();

  @Output()
  createPostWithImage: EventEmitter<{ image: File; text: string }> =
    new EventEmitter();

  @Output()
  postImageSelected: EventEmitter<File> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  holdPostImage(image: File) {
    this.imageSelected = image;
  }

  onCreatePost(text: string) {
    if (this.imageSelected) {
      const postWithImage = { image: this.imageSelected, text };
      this.createPostWithImage.emit(postWithImage);
    } else {
      this.createPostWithoutImage.emit(text);
    }
  }
}
