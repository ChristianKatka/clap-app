import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ImageActions } from '../actions';
import { MyImageService } from 'src/Image/services/my-image.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ImageEffects {
  getImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.getImages),
      switchMap(() =>
        this.myImageService.getImages().pipe(
          map((imagesResponse) =>
            ImageActions.getImagesSuccess({
              imagesResponse,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ImageActions.getImagesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  storeUploadedImageInformationToDB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.storeUploadedImageInformationToDB),
      switchMap(({ name, mimeType }) =>
        this.myImageService
          .storeUploadedImageInformationToDB(name, mimeType)
          .pipe(
            map((image) =>
              ImageActions.storeUploadedImageInformationToDBSuccess({ image })
            ),
            catchError((error: string) => {
              return of(
                ImageActions.storeUploadedImageInformationToDBFailure({ error })
              );
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private myImageService: MyImageService
  ) {}
}
