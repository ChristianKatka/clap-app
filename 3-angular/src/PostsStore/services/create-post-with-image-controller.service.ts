import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { Store } from '@ngrx/store';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PostsExtendedAppState } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class CreatePostWithImageControllerService {
  s3Key: string | undefined;

  constructor(
    protected http: HttpClient,
    private store: Store<PostsExtendedAppState>
  ) {}

  public createPostWithImage(postWithImageDraft: PostWithImageDraft) {
    console.log(postWithImageDraft);

    // this.store.dispatch(
    //   ProfileImageActions.setUploadingProfileImage({ file: modifiedFile })
    // );

    // const subscription: any = this.myProfileImageService
    //   .getSignedUrlForUploadingProfileImage(modifiedFile)
    //   .pipe(
    //     tap(({s3Key}) => this.s3Key = s3Key),
    //     mergeMap(({ name, uploadUrl, s3Key, mimeType }) =>
    //       this.uploadFile(uploadUrl, image).pipe(
    //         map((event: HttpEvent<any>) => ({
    //           eventti: event,
    //           name,
    //           s3Key,
    //           mimeType,
    //         }))
    //       )
    //     )
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       response.eventti;

    //       switch (response.eventti.type) {
    //         case HttpEventType.Sent:
    //           break;
    //         case HttpEventType.ResponseHeader:
    //           break;
    //         case HttpEventType.UploadProgress:
    //           if (response.eventti.total) {
    //             const progress = Math.round(
    //               (response.eventti.loaded / response.eventti.total) * 100
    //             );
    //             this.store.dispatch(
    //               ProfileImageActions.setUploadingProfileImageProgress({
    //                 progress,
    //               })
    //             );
    //           }
    //           break;
    //         case HttpEventType.Response:
    //           console.log(this.s3Key);

    //           if (!this.s3Key) return;
    //           this.store.dispatch(
    //             ProfileImageActions.storeUploadedProfileImageInformationToDB({
    //               name: response.name,
    //               mimeType: response.mimeType,
    //               s3Key: this.s3Key,
    //             })
    //           );
    //       }
    //     },
    //     error: (e) => {
    //       console.log('Error uploading a file.');
    //       console.error(e);
    //     },
    //     complete: () => subscription.unsubscribe(),
    //   });
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
