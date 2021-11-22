import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss'],
})
export class FileSelectComponent {
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
