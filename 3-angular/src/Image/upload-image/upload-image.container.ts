import { Component, OnInit, ElementRef } from '@angular/core';
import { ImageUploadControllerService } from '../services/image-upload-controller.service';

@Component({
  selector: 'app-upload-image-container',
  templateUrl: 'upload-image.container.html',
  styleUrls: ['upload-image.container.scss'],
})
export class UploadImageContainerComponent implements OnInit {
  constructor(
    private imageUploadControllerService: ImageUploadControllerService
  ) {}

  ngOnInit() {}

  onFileSelected(file: File) {
    this.imageUploadControllerService.uploadImage(file);
  }
}
