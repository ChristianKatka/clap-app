import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clap-app-create-post-add-image',
  templateUrl: 'create-post-add-image.component.html',
  styleUrls: ['create-post-add-image.component.scss'],
})
export class CreatePostAddImageComponent implements OnInit {
  @Output()
  postImageSelected: EventEmitter<File> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
