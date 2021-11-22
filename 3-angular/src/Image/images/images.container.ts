import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-container',
  templateUrl: 'images.container.html',
  styleUrls: ['images.container.scss'],
})
export class ImagesContainerComponent implements OnInit {
  @Input()
  images: any;

  constructor() {}

  ngOnInit() {}
}
