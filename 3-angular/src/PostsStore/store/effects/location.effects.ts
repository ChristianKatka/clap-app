import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MyProfileService } from 'src/MyProfile/services/my-profile.service';
import { LocationActions } from '../actions';

@Injectable()
export class LocationEffects {
  selectLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.selectLocation),
      switchMap(({ location }) =>
        this.myProfileService.updateUsersSelectedLocation(location).pipe(
          map((myProfile) =>
            LocationActions.selectLocationSuccess({
              location: myProfile.selectedLocation,
            })
          ),
          catchError((error: string) => {
            console.log(error);
            return of(
              LocationActions.selectLocationFailure({
                error: 'error updating location',
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private myProfileService: MyProfileService
  ) {}
}
