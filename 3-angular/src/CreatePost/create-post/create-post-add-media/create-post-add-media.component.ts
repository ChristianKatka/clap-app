import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clap-app-create-post-add-media',
  templateUrl: 'create-post-add-media.component.html',
  styleUrls: ['create-post-add-media.component.scss'],
})
export class CreatePostAddMediaComponent implements OnInit {
  @Output()
  postMediaSelected: EventEmitter<File> = new EventEmitter();
  @Output()
  openCamera = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
