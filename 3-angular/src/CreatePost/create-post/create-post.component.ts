import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clap-app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input()
  loading = false;

  @Output()
  createPost: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
