import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { components } from '.';
import { SharedModule } from '@shared/shared.module';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { featureKey, reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...components],
  exports: [...components],
})
export class MyProfileModule {}
