import { Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { TermsOfServiceComponent } from '../components/terms-of-service.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy.component';

@Injectable({
  providedIn: 'root',
})
export class AboutBottomSheetsService {
  privacyPolicySheetRef: MatBottomSheetRef | undefined;
  termsOfServiceSheetRef: MatBottomSheetRef | undefined;

  constructor(private bottomSheet: MatBottomSheet) {}

  openPrivacyPolicyBottomSheet() {
    this.privacyPolicySheetRef = this.bottomSheet.open(PrivacyPolicyComponent);
  }

  dismissPrivacyPolicyBottomSheet() {
    if (this.privacyPolicySheetRef) {
      this.privacyPolicySheetRef.dismiss();
      this.privacyPolicySheetRef = undefined;
    }
  }

  openTermsOfServiceBottomSheet() {
    this.termsOfServiceSheetRef = this.bottomSheet.open(
      TermsOfServiceComponent,
      // {
      //   panelClass: ['full-screen', 'primary-bg'],
      // }
    );
  }

  dismissTermsOfServiceBottomSheet() {
    if (this.termsOfServiceSheetRef) {
      this.termsOfServiceSheetRef.dismiss();
      this.termsOfServiceSheetRef = undefined;
    }
  }
}
