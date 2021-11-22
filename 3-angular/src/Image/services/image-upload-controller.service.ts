import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ImagesFeatureState } from '../store/reducers';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ImageActions } from '../store/actions';
import { MyImageService } from './my-image.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadControllerService {
  constructor(
    private store: Store<ImagesFeatureState>,
    private myImageService: MyImageService,
    protected http: HttpClient
  ) {}

  public uploadImage(image: File) {
    const modifiedFile = { name: image.name, mimeType: image.type };
    this.store.dispatch(ImageActions.setUploadingFile({ file: modifiedFile }));

    const subscription: any = this.myImageService
      .getSignedUrlForUploadingImage(modifiedFile)
      .pipe(
        mergeMap(({ name, uploadUrl, s3Key, mimeType }) =>
          this.uploadFile(uploadUrl, image).pipe(
            map((event: HttpEvent<any>) => ({
              eventti: event,
              name,
              s3Key,
              mimeType,
            }))
          )
        )
      )
      .subscribe({
        next: (response) => {
          response.eventti;

          switch (response.eventti.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              if (response.eventti.total) {
                const progress = Math.round(
                  (response.eventti.loaded / response.eventti.total) * 100
                );
                this.store.dispatch(
                  ImageActions.setUploadingFileProgress({
                    progress,
                  })
                );
              }
              break;
            case HttpEventType.Response:
              this.store.dispatch(
                ImageActions.storeUploadedImageInformationToDB({
                  name: response.name,
                  mimeType: response.mimeType,
                })
              );
          }
        },
        error: (e) => {
          console.log('Error uploading a file.');
          console.error(e);
        },
        complete: () => subscription.unsubscribe(),
      });
  }

  private uploadFile(
    uploadUrl: string,
    image: File | undefined
  ): Observable<any> {
    if (image) {
      return this.http.put(uploadUrl, image, {
        headers: new HttpHeaders({
          'Content-Type': image.type,
        }),
        reportProgress: true,
        observe: 'events',
      });
    } else {
      return of(undefined);
    }
  }
}
