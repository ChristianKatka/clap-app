import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  map,
  mergeMap, tap
} from 'rxjs/operators';
import { ProfileImageActions } from '../store/actions';
import { ProfileExtendedAppState } from '../store/reducers';
import { MyProfileImageService } from './my-profile-image.service';



@Injectable({
  providedIn: 'root',
})
export class MyProfileImageUploadControllerService {
  s3Key: string | undefined;

  constructor(
    private store: Store<ProfileExtendedAppState>,
    private myProfileImageService: MyProfileImageService,
    protected http: HttpClient
  ) {}

  public uploadImage(image: File) {
    const modifiedFile = { name: image.name, mimeType: image.type };
    console.log(image);
    console.log(modifiedFile);

    this.store.dispatch(
      ProfileImageActions.setUploadingProfileImage({ file: modifiedFile })
    );

    const subscription: any = this.myProfileImageService
      .getSignedUrlForUploadingProfileImage(modifiedFile)
      .pipe(
        tap(({s3Key}) => this.s3Key = s3Key),
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
                  ProfileImageActions.setUploadingProfileImageProgress({
                    progress,
                  })
                );
              }
              break;
            case HttpEventType.Response:
              console.log(this.s3Key);
              
              if (!this.s3Key) return;
              this.store.dispatch(
                ProfileImageActions.storeUploadedProfileImageInformationToDB({
                  name: response.name,
                  mimeType: response.mimeType,
                  s3Key: this.s3Key,
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
