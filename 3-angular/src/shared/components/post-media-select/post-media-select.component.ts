import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clap-app-post-media-select',
  templateUrl: 'post-media-select.component.html',
  styleUrls: ['post-media-select.component.scss'],
})
export class PostMediaSelectComponent {
  @Output()
  mediaSelected: EventEmitter<File> = new EventEmitter();

  onFileSelect(file: File | FileList) {
    if (file instanceof FileList) {
      this.mediaSelected.emit(Array.from(file)[0]);
    } else {
      this.mediaSelected.emit(file);
    }
  }
}
