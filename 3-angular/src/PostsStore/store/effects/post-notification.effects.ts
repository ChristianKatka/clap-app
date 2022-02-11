import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PostNotificationService } from 'src/PostsStore/services/post-notification.service';
import { PostNotificationActions } from '../actions';

@Injectable()
export class PostNotificationEffects {
  iHaveSeenNotifications = createEffect(() =>
    this.actions$.pipe(
      ofType(PostNotificationActions.iHaveSeenNotifications),
      switchMap(({ notificationsThatIhaventSeen }) => {
        return this.postNotificationService
          .setMyNotificationsAsSeen(notificationsThatIhaventSeen)
          .pipe(
            tap((x) => console.log(x)),
            map(() =>
              PostNotificationActions.iHaveSeenNotificationsSuccess()
            ),
            catchError(() => {
              return of(
                PostNotificationActions.iHaveSeenNotificationsFailure({
                  error: 'Error setting notification property to seen',
                })
              );
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private postNotificationService: PostNotificationService
  ) {}
}
