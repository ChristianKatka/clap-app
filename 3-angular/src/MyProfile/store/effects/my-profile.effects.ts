import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MyProfileActions } from '../actions';
import { MyProfileService } from 'src/MyProfile/services/my-profile.service';
import { MyProfileBottomSheetService } from 'src/MyProfile/services/my-profile-bottom-sheet.service';

@Injectable()
export class MyProfileEffects {
  updateUserBio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyProfileActions.updateUserBio),
      switchMap(({ bio }) =>
        this.myProfileService.updateUserBio(bio).pipe(
          map((myProfile) =>
            MyProfileActions.updateUserBioSuccess({ myProfile })
          ),
          catchError((error: string) => {
            console.log(error);
            return of(
              MyProfileActions.updateUserBioFailure({
                error: 'error updating bio',
              })
            );
          })
        )
      )
    )
  );

  updateUserBioSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MyProfileActions.updateUserBioSuccess),
        tap(() =>
          this.myProfileBottomSheetService.closeEditProfileBottomSheet()
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private myProfileService: MyProfileService,
    private myProfileBottomSheetService: MyProfileBottomSheetService,
    private store: Store
  ) {}
}
