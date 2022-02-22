import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  PostWithMediaDraftToDb,
  PostWithMediaImageUploaded,
} from '@shared/models/post-with-media.model';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { PostsActions } from '../store/actions';
import { PostsExtendedAppState } from '../store/reducers';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class CreatePostWithImageControllerService {
  s3Key: string | undefined;

  constructor(
    protected http: HttpClient,
    private store: Store<PostsExtendedAppState>,
    private postsService: PostsService
  ) {}

  public createPostWithImage(
    postWithImageDraft: PostWithMediaDraftToDb,
    media: File
  ) {
    this.store.dispatch(PostsActions.setupCreatingPostWithImage());

    const subscription: any = this.postsService
      .getSignedUrlForUploadingPostImage(media.name, media.type)
      .pipe(
        tap(({ s3Key }) => (this.s3Key = s3Key)),
        mergeMap(({ uploadUrl }) =>
          this.uploadFile(uploadUrl, media).pipe(
            map((httpEvent: HttpEvent<any>) => ({
              httpEvent,
            }))
          )
        )
      )
      .subscribe({
        next: (response) => {
          response.httpEvent;

          switch (response.httpEvent.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              if (response.httpEvent.total) {
                const imageUploadProgressAmount = Math.round(
                  (response.httpEvent.loaded / response.httpEvent.total) * 100
                );
                this.store.dispatch(
                  PostsActions.setPostImageUploadProgressAmount({
                    imageUploadProgressAmount,
                  })
                );
              }
              break;
            case HttpEventType.Response:
              if (!this.s3Key) return;

              const postWithMediaDraft: PostWithMediaImageUploaded = {
                id: postWithImageDraft.id,
                text: postWithImageDraft.text,
                postLocation: postWithImageDraft.postLocation,
                mimeType: postWithImageDraft.mimeType,
                s3Key: this.s3Key,
              };

              this.store.dispatch(
                PostsActions.createPostWithMedia({
                  postWithMediaDraft,
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
