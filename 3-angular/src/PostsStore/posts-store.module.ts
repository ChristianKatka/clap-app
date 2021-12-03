import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [],
  exports: [],
})
export class PostsStoreModule {}
