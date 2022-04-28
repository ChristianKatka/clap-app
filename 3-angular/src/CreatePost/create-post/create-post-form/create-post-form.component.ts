import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostDraft } from '@shared/models/post.model';
import { noWhiteSpaceAtStartOrEndPattern } from '@shared/regex/regex';

@Component({
  selector: 'clap-app-create-post-form',
  templateUrl: 'create-post-form.component.html',
  styleUrls: ['create-post-form.component.scss'],
})
export class CreatePostFormComponent {

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

  submit() {
    const validatedPostFormData = {
      ...this.createPostForm.value,
      postLocation: this.capitalizeFirstLetter(
        this.createPostForm.value.postLocation
      ),
    };
    this.createPost.emit(validatedPostFormData);
  }

  capitalizeFirstLetter(string: string) {
    const allLowerCase = string.toLowerCase();
    return allLowerCase.charAt(0).toUpperCase() + allLowerCase.slice(1);
  }
}
