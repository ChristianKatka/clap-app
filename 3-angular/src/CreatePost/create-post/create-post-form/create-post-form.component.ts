import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostDraft } from '@shared/models/post.model';
import { noWhiteSpaceAtStartOrEndPattern } from '@shared/regex/regex';

@Component({
  selector: 'clap-app-create-post-form',
  templateUrl: 'create-post-form.component.html',
  styleUrls: ['create-post-form.component.scss'],
})
export class CreatePostFormComponent implements OnInit {
  @Input()
  loading = false;

  @Output()
  createPost: EventEmitter<PostDraft> = new EventEmitter();

  createPostForm = new FormGroup({
    text: new FormControl('', Validators.required),
    postLocation: new FormControl('', [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern(noWhiteSpaceAtStartOrEndPattern),
    ]),
  });

  ngOnInit() {}

  submit() {
    const validatedPostFormData = {
      ...this.createPostForm.value,
      postLocation: this.capitalizeFirstLetter(
        this.createPostForm.value.postLocation
      ),
    };
    console.log(validatedPostFormData);

    // this.createPost.emit(validatedPostFormData);
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
