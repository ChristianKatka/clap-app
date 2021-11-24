import { CommonModule } from '@angular/common';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PrivacyPolicyComponent } from './components/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service.component';

const components = [PrivacyPolicyComponent, TermsOfServiceComponent];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class AboutModule {}
