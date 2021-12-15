import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clap-app-post-image-file-select',
  templateUrl: 'post-image-file-select.component.html',
  styleUrls: ['post-image-file-select.component.scss'],
})
export class PostImageFileSelectComponent {
  @Output()
  fileSelected: EventEmitter<File> = new EventEmitter();

  onFileSelect(file: File | FileList) {
    if (file instanceof FileList) {
      this.fileSelected.emit(Array.from(file)[0]);
    } else {
      this.fileSelected.emit(file);
    }
  }
}
