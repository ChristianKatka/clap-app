import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clap-app-create-post-form',
  templateUrl: 'create-post-form.component.html',
  styleUrls: ['create-post-form.component.scss'],
})
export class CreatePostFormComponent implements OnInit {
  createPostForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit() {}
}
