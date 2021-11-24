import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AboutActions } from '../actions';
import { AboutBottomSheetsService } from '../../services/about-bottom-sheets.service';

@Injectable()
export class AboutEffects {
  showPrivacyPolicy$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AboutActions.showPrivacyPolicy),
        tap(() => this.aboutBottomSheetsService.openPrivacyPolicyBottomSheet())
      ),
    { dispatch: false }
  );

  hidePrivacyPolicy$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AboutActions.closePrivacyPolicy),
        tap(() =>
          this.aboutBottomSheetsService.dismissPrivacyPolicyBottomSheet()
        )
      ),
    { dispatch: false }
  );

  showTermsOfService$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AboutActions.showTermsOfService),
        tap(() => this.aboutBottomSheetsService.openTermsOfServiceBottomSheet())
      ),
    { dispatch: false }
  );

  hideTermsOfService$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AboutActions.closeTermsOfService),
        tap(() =>
          this.aboutBottomSheetsService.dismissTermsOfServiceBottomSheet()
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private aboutBottomSheetsService: AboutBottomSheetsService
  ) {}
}
