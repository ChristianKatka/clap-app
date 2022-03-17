import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'clap-app-camera',
  templateUrl: 'camera.container.html',
  styleUrls: ['camera.container.scss'],
})
export class CameraContainerComponent implements OnInit {
  @Output() getPicture = new EventEmitter<File>();
  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  constructor() {}

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
  }

  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    const image = this.convertWebCamImageToFile(webcamImage);
    this.getPicture.emit(image);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  //--------------------

  public get videoOptions(): MediaTrackConstraints {
    //you can set ideal,min,max for width and height
    const result: MediaTrackConstraints = {
      width: { min: 640, ideal: 1920 },
      height: { min: 480, ideal: 1080 },
    };

    return result;
  }

  convertWebCamImageToFile(webcamImage: WebcamImage): File {
    const arr = webcamImage.imageAsDataUrl.split(',');
    // const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file: File = new File([u8arr], 'my-webcam-image', {
      type: 'image/jpeg',
    });
    return file;
  }
}
