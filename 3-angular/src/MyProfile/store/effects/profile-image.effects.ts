import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MyProfileImageService } from 'src/MyProfile/services/my-profile-image.service';
import { ProfileImageActions } from '../actions';
import { MyProfileSelectors } from '../selectors';

@Injectable()
export class ProfileImageEffects {
  storeUploadedIProfilemageInformationToDB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileImageActions.storeUploadedProfileImageInformationToDB),
      withLatestFrom(this.store.select(MyProfileSelectors.getMyUserId)),
      switchMap(([{ name, mimeType, s3Key }, userId]) => {
        if (!userId)
          return of(
            ProfileImageActions.storeUploadedProfileImageInformationToDBFailure(
              { error: 'no userId' }
            )
          );

        return this.myProfileImageService
          .storeUploadedProfileImageInformationToDB(
            name,
            mimeType,
            s3Key,
            userId
          )
          .pipe(
            map((image) =>
              ProfileImageActions.storeUploadedProfileImageInformationToDBSuccess(
                { image }
              )
            ),
            catchError((error: string) => {
              return of(
                ProfileImageActions.storeUploadedProfileImageInformationToDBFailure(
                  { error: 'error storing image info to db' }
                )
              );
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private myProfileImageService: MyProfileImageService,
    private store: Store
  ) {}
}
