import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'clap-app-create-post-media-holder',
  templateUrl: 'create-post-media-holder.component.html',
  styleUrls: ['create-post-media-holder.component.scss'],
})
export class CreatePostMediaHolderComponent implements OnInit {
  @Input()
  postMediaSelected: File | undefined;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {}

  getTrustedMediaUrl() {
    if (this.postMediaSelected) {
      return this.domSanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.postMediaSelected)
      );
    }
    return undefined;
  }
}
