import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clap-app-create-post-form',
  templateUrl: 'create-post-form.component.html',
  styleUrls: ['create-post-form.component.scss'],
})
export class CreatePostFormComponent implements OnInit {
  @Output()
  createPost: EventEmitter<string> = new EventEmitter();

  createPostForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    this.createPost.emit(this.createPostForm.value.text);
  }
}
