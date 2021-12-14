import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clap-app-post-add-comment-form',
  templateUrl: 'post-add-comment-form.component.html',
  styleUrls: ['post-add-comment-form.component.scss'],
})
export class PostAddCommentFormComponent implements OnInit {
  @Input()
  myProfileImage: string | null = null;

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    console.log(this.commentForm.value);
  }
}
