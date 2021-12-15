import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'clap-app-create-post-image-holder',
  templateUrl: 'create-post-image-holder.component.html',
  styleUrls: ['create-post-image-holder.component.scss'],
})
export class CreatePostImageHolderComponent implements OnInit {
  @Input()
  postImageSelected: File | undefined;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {}

  getTrustedImageUrl() {
    if (this.postImageSelected) {
      return this.domSanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.postImageSelected)
      );
    }
    return undefined;
  }
}
