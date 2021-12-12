import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clap-app-profile-image-select',
  templateUrl: './profile-image-select.component.html',
  styleUrls: ['./profile-image-select.component.scss'],
})
export class ProfileImageSelectComponent {
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
