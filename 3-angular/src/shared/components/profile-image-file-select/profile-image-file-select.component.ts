import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clap-app-profile-image-file-select',
  templateUrl: 'profile-image-file-select.component.html',
  styleUrls: ['profile-image-file-select.component.scss'],
})
export class ProfileImageFileSelectComponent {
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
