import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'clap-app-post-add-comment-form',
  templateUrl: 'post-add-comment-form.component.html',
  styleUrls: ['post-add-comment-form.component.scss'],
})
export class PostAddCommentFormComponent implements OnInit {
  @Input()
  myProfileImage: string | null = null;

  @Input()
  isAddCommentClicked = false;

  @Output()
  createCommentToPost: EventEmitter<string> = new EventEmitter();

  commentFormControl = new FormControl('');
  commentForm = new FormGroup({
    comment: this.commentFormControl,
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    const comment = this.commentForm.value.comment.trim();
    if (comment.length > 0) {
      this.createCommentToPost.emit(comment);
    }
    this.commentForm.reset();
  }
}
